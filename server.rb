require 'bundler/setup'
Bundler.require

require 'securerandom'

ActiveRecord::Base.establish_connection(
  adapter: 'sqlite3',
  database: 'todo.sqlite3'
)
ActiveRecord::Base.include_root_in_json = false

ActiveRecord::Schema.define(version: 0) do
  create_table :tasks do |t|
    t.string :title, null: false
    t.string :user_id, null: false
    t.string :status, default: 'pending', null: false
    t.timestamps
  end
end rescue nil

class Task < ActiveRecord::Base
  validates_presence_of :title, :user_id
  validates_inclusion_of :status, in: %w[pending done]

  def to_json(*)
    attributes.merge(errors: errors.full_messages).to_json
  end
end

module Helpers
  def json(resource, code = 200)
    content_type :json
    status code
    resource.to_json
  end
end

use Rack::Session::Cookie, {
  key: 'rack.session',
  expire_after: 315576000,
  secret: '61e8dc7ad6fc5fed7d9d760341b3c71b2612d1df6fdda5e62ee158752a2fc5e122c4397c205061b'
}

disable :protection

helpers do
  include Helpers
end

before do
  session[:user_id] ||= SecureRandom.hex(5)
  headers 'Access-Control-Allow-Origin' => '*'
end

get '/' do
  erb :index
end

get '/tasks' do
  json Task.where(user_id: session[:user_id])
end

get '/tasks/:id' do
  json Task.find_by_user_id_and_id(session[:user_id], params[:id])
end

post '/tasks' do
  task = Task.new(params[:task])
  task.user_id = session[:user_id]

  begin
    task.save!
    json task, 201
  rescue ActiveRecord::RecordInvalid
    json task.errors.full_messages, 422
  end
end

patch '/tasks/:id' do
  task = Task.find_by_user_id_and_id(session[:user_id], params[:id])
  task.attributes = params[:task]

  begin
    task.save!
    json task
  rescue ActiveRecord::RecordInvalid
    json task.errors.full_messages, 422
  end
end

delete '/tasks/:id' do
  task = Task.find_by_user_id_and_id(session[:user_id], params[:id])
  task.destroy

  content_type :json
  status 204
  ''
end
