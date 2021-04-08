module Twist
  module Web
    module Controllers
      module CORS
        def self.included(base)
          base.before :set_cors_headers
        end

        def set_cors_headers(req, res)
          res.headers["Access-Control-Allow-Origin"] = ENV['FRONTEND_APP_URL']
          res.headers["Access-Control-Allow-Headers"] = 'Content-Type, Authorization'
          res.headers["Access-Control-Request-Method"] = '*'
        end
      end
    end
  end
end
