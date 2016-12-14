#!/bin/env ruby
# encoding: utf-8

require 'sinatra'

require_relative "system/nataniev.rb"

set :port, 8888


get '/' do
  $nataniev = Nataniev.new
  puts request.base_url
  
  v = ARGV.first ? ARGV.first : "ghost"
  if request.base_url.include? "xxiivv" then v = "oscean" end
  if request.base_url.include? "grimgrains" then v = "grimgrains" end
  if request.base_url.include? "100r" then v = "hundredrabbits" end
  a = $nataniev.answer("#{v} serve home")
  "#{a}"
end


get '/:task' do
  $nataniev = Nataniev.new
  puts request.base_url
  
  v = ARGV.first ? ARGV.first : "ghost"
  if request.base_url.include? "xxiivv" then v = "oscean" end
  if request.base_url.include? "grimgrains" then v = "grimgrains" end
  if request.base_url.include? "100r" then v = "hundredrabbits" end
  
  "#{$nataniev.answer("#{v} serve "+params[:task])}"
end