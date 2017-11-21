#!/bin/env ruby
# encoding: utf-8

class Media

  attr_accessor :cat
  attr_accessor :frames

  def initialize cat, id ,cl = ""

    @id  = id.to_s.gsub(" ",".").downcase
    @cat = cat.to_s.downcase.gsub(" ",".")
    @class = cl

    @frames = @id.include?(">>") ? @id.split(">>")[1].to_i : nil
    @id = @id.include?(">>") ? @id.split(">>")[0] : @id
  
  end

  def exists

    if File.exist?("#{path}/#{@cat}/#{@id}.jpg")
      return "jpg"
    elsif File.exist?("#{path}/#{@cat}/#{@id}.png")
      return "png"
    elsif File.exist?("#{path}/#{@cat}/#{@id}.mp4")
      return "mp4"
    elsif File.exist?("#{path}/#{@cat}/#{@id}.svg")
      return "svg"
    end
    return nil

  end

  def set_class c

    @class = c

  end

  def set_style s

    @style = s

  end

  def to_s

    if @frames
      html = ""
      f = 0
      while f < @frames
        html += "<media #{@class ? "class='gallery #{@class}'" : ""} style='background-image:url(#{path.split('public/').last}/#{@cat}/#{@id}.#{f}.jpg);#{@style}'></media>"
        f += 1
      end
      return "<gallery>#{html}</gallery>"
    elsif File.exist?("#{path}/#{@cat}/#{@id}.mp4")
      return "<video #{@class ? "class='#{@class}'" : ""} style='#{@style}' autoplay loop><source src='#{path.split('public/').last}/#{@cat}/#{@id}.mp4' type='video/mp4'>Your browser does not support the video tag.</video>"
    elsif File.exist?("#{path}/#{@cat}/#{@id}.jpg")
      return "<media #{@class ? "class='#{@class}'" : ""}  style='background-image:url(#{path.split('public/').last}/#{@cat}/#{@id}.jpg);#{@style}'></media>"
    elsif File.exist?("#{path}/#{@cat}/#{@id}.png")
      return "<media #{@class ? "class='#{@class}'" : ""} style='background-image:url(#{path.split('public/').last}/#{@cat}/#{@id}.png);#{@style}'></media>"
    elsif File.exist?("#{path}/#{@cat}/#{@id}.svg")
      return "<media #{@class ? "class='#{@class}'" : ""} style='background-image:url(#{path.split('public/').last}/#{@cat}/#{@id}.svg);#{@style}'></media>"
    end
    puts "<alert>Missing: #{path}/#{@cat}/#{@id}[#{@frames}]</alert>"
    return ""

  end

  def to_img

    if File.exist?("#{path}/#{@cat}/#{@id}.jpg")
      return "<img src='"+path.split('public/').last+"/"+@cat+"/"+@id+".jpg'/>"
    elsif File.exist?("#{path}/#{@cat}/#{@id}.png")
      return "<img src='"+path.split('public/').last+"/#{@cat}/#{@id}.png'/>"
    end
    return nil

  end

  def debug

    return "[missing:#{path}/#{@cat}/#{@id}:#{@class}]"

  end

end
