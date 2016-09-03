#!/bin/env ruby
# encoding: utf-8

$nataniev_path = File.expand_path(File.join(File.dirname(__FILE__), "/"))

load "#{$nataniev_path}/library/di.parser.rb"
load "#{$nataniev_path}/library/en.parser.rb"

load "#{$nataniev_path}/system/tools.rb"
load "#{$nataniev_path}/system/console.rb"
load "#{$nataniev_path}/system/vessel.rb"
load "#{$nataniev_path}/system/clock.rb"
load "#{$nataniev_path}/system/desamber.rb"
load "#{$nataniev_path}/system/timestamp.rb"

load "#{$nataniev_path}/vessels/ghost.rb"
load "#{$nataniev_path}/vessels/basic.rb"

class Nataniev

  def initialize

  	@console = Console.new
    @id      = nil
    @player  = nil
    @parade  = nil 
    @estate  = 30000

  end

  def parade  ; @parade = !@parade ? Di.new("paradise") : @parade ; return @parade  end
  def actor   ; return @actor end
  def console ; return @console end

  def operate actor, action, params

    @parade = Di.new("paradise")

    actor_vessel = actor.to_i > 0 ? make_vessel(actor) : make_anonym(actor)

    if !actor_vessel then return "Unknown vessel id: #{actor}" else @actor = actor_vessel end

    if actor_vessel.respond_to?("__#{action}")
      return actor_vessel.send("__#{action}",params).strip
    elsif actor_vessel.parent_vessel.respond_to?("via__#{action}")
      return actor_vessel.parent_vessel.send("via__#{action}",params).strip
    else
      return "Unknown action: #{action}"
    end

  end

  def make_vessel id

    line = parade.line(id.to_i) ; if !line then return nil end
    if line['CODE']
      instance = line['CODE'].split("-")[3].downcase
      if File.exist?("#{$nataniev_path}/vessels/#{instance}.rb")
        load("#{$nataniev_path}/vessels/#{instance}.rb")
        return Object.const_get(instance.capitalize).new(id.to_i,line)
      end
    end
    return Ghost.new(id.to_i,line)

  end

  def make_anonym id

    if !File.exist?("#{$nataniev_path}/vessels/#{id}.rb") then return Ghost.new end

    load("#{$nataniev_path}/vessels/#{id}.rb")
    return Object.const_get(id.capitalize).new()

    return nil

  end

  def find_available_id

    id = 0
    while id < 30000
      id +=1
      if parade.to_a[id]['CODE'] then next end
      return id
    end

    return nil

  end

  def find_random_basic_vessel

    target = make_vessel(rand(0...20000))
    if target.class != Basic.new.class then return find_random_basic_vessel end
    return target

  end


end