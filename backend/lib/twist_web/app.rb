module Twist
  module Web
    def self.app
      Rack::Builder.new do
        use Hanami::Middleware::BodyParser, :json
        run Twist::Web::Router
      end
    end
  end
end
