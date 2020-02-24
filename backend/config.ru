require './config/environment'
if ENV['BUGSNAG_API_KEY']
  require 'bugsnag'

  Bugsnag.configure do |config|
    config.api_key = ENV['BUGSNAG_API_KEY']
  end

  use Bugsnag::Rack
end

if ENV['APP_ENV'] == "development"
  use Rack::Static, urls: ["/uploads"], root: "public"
end
use Hanami::Middleware::BodyParser, :json
run Twist::Web::Router
