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

load "#{$nataniev_path}/vessels/ghost.rb"
load "#{$nataniev_path}/vessels/basic.rb"

class Nataniev

  def initialize

  	@console = Console.new
    @id      = nil
    @player  = nil
    @parade  = nil 

  end

  def parade  ; return @parade  end
  def player  ; return @player  end
  def console ; return @console end

  def set_player id

    @id = id

    if @id.to_i > 0
      @parade = Di.new("paradise")
      @player = make_vessel(@id)
    else
      @player = make_anonym(@id)
    end

  end

  def answer query

    if !@player then set_player(query.split(" ").first) ; query = query.sub(query.split(" ").first,"").strip end

    query = query == "" ? "look" : query

    action = query.split(" ").first.strip
    params = query.sub(action,"").strip

    if @player.respond_to?("__#{action}")
      return @player.send("__#{action}",params).strip
    elsif @player.parent_vessel.respond_to?("via__#{action}")
      return @player.parent_vessel.send("via__#{action}",params).strip
    else
      return "Unknown action: #{action}"
    end

  end

  def refresh

    set_player(@id)

  end

  def make_vessel id

    line = @parade.line(id.to_i)
    if line['CODE']
      instance = line['CODE'].split("-")[3].downcase
      if File.exist?("#{$nataniev_path}/vessels/#{instance}.rb")
        load("#{$nataniev_path}/vessels/#{instance}.rb")
        return Object.const_get(instance.capitalize).new(id.to_i,line)
      end
    end
    return Basic.new(id.to_i,line)

  end

  def make_anonym id

    if !File.exist?("#{$nataniev_path}/vessels/#{id}.rb") then return Ghost.new end

    load("#{$nataniev_path}/vessels/#{id}.rb")
    return Object.const_get(id.capitalize).new()

    return nil

  end

end