#!/bin/env ruby
# encoding: utf-8

# You see nothing, enter the nothing.


class Nataniev

  def initialize

    @time    = Time.new
    @path    = File.expand_path(File.join(File.dirname(__FILE__), "/"))

    load "#{@path}/system/tools.rb"

    @id      = nil
    @player  = nil
    @parade  = nil 
    @estate  = 30000

  end

  def start

    load_folder "#{path}/system/*"
    load "#{@path}/vessels/ghost.rb"
    load "#{@path}/vessels/basic.rb"

  end

  attr_accessor :time
  attr_accessor :path
  attr_accessor :actor

  def console
    
    load "#{@path}/system/console.rb"
    return Console.new

  end

  def parade  ; @parade = !@parade ? Di.new("paradise") : @parade ; return @parade  end

  def answer q = nil

    parts  = q.split(" ")
    actor  = parts[0]
    action = parts[1] ? parts[1] : "look"
    params = q.sub("#{actor}","").sub("#{action}","").strip

    return operate(actor,action,params)

  end

  def operate actor, action, params

    actor_vessel = actor.to_i > 0 ? make_vessel(actor) : make_anonym(actor)

    if !actor_vessel then return "? #{actor} is not a valid vessel id." else @actor = actor_vessel end

    # Default
    vessel = actor_vessel
    if vessel && vessel.default_actions.respond_to?("#{action}") then return vessel.default_actions.send("#{action}",params).strip end
    # Self
    vessel = actor_vessel
    if vessel && vessel.actions.respond_to?("#{action}") then return vessel.actions.send("#{action}",params).strip end
    # Parent
    vessel = actor_vessel.parent_vessel
    if vessel && vessel.parent_actions.respond_to?("#{action}") then return vessel.parent_actions.send("#{action}",params).strip end
    # Target
    vessel = actor_vessel.target_vessel(params)
    if vessel && vessel.target_actions.respond_to?("#{action}") then return vessel.target_actions.send("#{action}",params).strip end
    # Presence
    vessel = actor_vessel.presence_vessel(action)
    if vessel then return vessel.presence_actions.send("#{action}",params).strip end
    
    return "? #{action} is not a valid action. Use {{help}} to find the valid actions for the #{actor_vessel.class.to_s.downcase} vessel."

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

  def make_vessel id

    line = parade.line(id.to_i) ; if !line then return nil end
    if line['CODE']
      instance = line['CODE'].split("-")[3].downcase
      if File.exist?("#{$nataniev.path}/vessels/#{instance}.rb")
        load("#{$nataniev.path}/vessels/#{instance}.rb")
        return Object.const_get(instance.capitalize).new(id.to_i,line)
      end
    end
    return Ghost.new(id.to_i,line)

  end

  def make_anonym instance

    if File.exist?("#{$nataniev.path}/vessels/#{instance}.rb")
      load("#{$nataniev.path}/vessels/#{instance}.rb")
      return Object.const_get(instance.capitalize).new
    elsif File.exist?("#{$nataniev.path}/instances/instance.#{instance}/vessel.rb")
      load "#{$nataniev.path}/instances/instance.#{instance}/vessel.rb"
      return Object.const_get(instance.capitalize).new
    end
    return Ghost.new

  end

end