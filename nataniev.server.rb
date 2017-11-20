#!/bin/env ruby
# encoding: utf-8

require 'sinatra'
require 'json'

require_relative "system/nataniev.rb"

set :port, (ARGV.first == "lobby" ? 8668 : 8888)

configure do
  enable :cross_origin
end

get '/' do

  $nataniev = Nataniev.new

  headers( "Access-Control-Allow-Origin" => "*" )

  v = ARGV.first ? ARGV.first : "ghost"
  if request.base_url.include? "xxiivv" then v = "landing" end
  if request.base_url.include? "wiki" then v = "oscean" end
  if request.base_url.include? "grimgrains" then v = "grimgrains" end
  if request.base_url.include? "100r" then v = "hundredrabbits" end
  if request.base_url.include? "paradise" then v = "paradise" end
  if request.base_url.include? "rotonde" then v = "rotonde" end
  if request.base_url.include? ":maeve" then v = "maeve" end
  a = $nataniev.answer("#{v} serve home")
  "#{a}"

end

get '/:task' do

  $nataniev = Nataniev.new
  
  headers( "Access-Control-Allow-Origin" => "*" )

  v = ARGV.first ? ARGV.first : "ghost"
  if request.base_url.include? "xxiivv" then v = "landing" end
  if request.base_url.include? "wiki" then v = "oscean" end
  if request.base_url.include? "grimgrains" then v = "grimgrains" end
  if request.base_url.include? "100r" then v = "hundredrabbits" end
  if request.base_url.include? "paradise" then v = "paradise" end
  if request.base_url.include? "rotonde" then v = "rotonde" end
  if params[:task].include? ":maeve" then v = "maeve" end
  a = $nataniev.answer("#{v} serve "+params[:task])
  "#{a}"

end