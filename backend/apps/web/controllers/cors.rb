module Web::Controllers
  module CORS
    def self.included(base)
      base.before :set_cors_headers
    end

    def set_cors_headers
      headers["Access-Control-Allow-Origin"] = '*'
      headers["Access-Control-Allow-Headers"] = 'Content-Type, Authorization'
      headers["Access-Control-Request-Method"] = '*'
    end
  end
end
