require './config/environment'
if ENV['BUGSNAG_API_KEY']
  require 'bugsnag'

  Bugsnag.configure do |config|
    config.api_key = ENV['BUGSNAG_API_KEY']
  end

  use Bugsnag::Rack
end

use Hanami::Middleware::BodyParser, :json
run Twist::Web::Router
