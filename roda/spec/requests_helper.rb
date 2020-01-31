# Require this file for feature tests
require_relative './spec_helper'

require 'rack/test'

module RequestHelpers
  def self.included(base)
    base.include Rack::Test::Methods
  end

  def app
    Twist::Web::Router
  end

  def response
    last_response
  end

  def json_body
    JSON.parse(response.body)
  end
end

RSpec.configure do |config|
  config.include RequestHelpers, type: :request
end
