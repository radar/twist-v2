module Twist
  module Web
    module Controllers
      module CORS
        def self.included(base)
          base.before :set_cors_headers
          base.before :respond_to_options
        end

        def set_cors_headers(req, res)
          res.headers["Access-Control-Allow-Origin"] = ENV['FRONTEND_APP_URL']
          res.headers["Access-Control-Allow-Headers"] = 'Content-Type, Authorization'
          res.headers["Access-Control-Request-Method"] = '*'
        end

        def respond_to_options(req, res)
          return unless req.options?

          halt 200
        end
      end
    end
  end
end
