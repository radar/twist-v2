module Twist
  module Web
    App = Rack::Builder.new do
      use Hanami::Middleware::BodyParser, :json
      run Twist::Web::Router
    end
  end
end
