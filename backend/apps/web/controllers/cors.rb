module Web::Controllers
  module CORS
    def self.included(base)
      base.before :set_cors_headers
    end

    def set_cors_headers
      headers["Access-Control-Allow-Origin"] = ENV.fetch('FRONTEND_URL')
      headers["Access-Control-Allow-Headers"] = 'Content-Type, Authorization'
      headers["Access-Control-Request-Method"] = '*'
    end
  end
end
