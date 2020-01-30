module Twist
  module Web
    module Controllers
      module Oauth
        module Client
          def client
            OAuth2::Client.new(
              ENV.fetch('OAUTH_CLIENT_ID'),
              ENV.fetch('OAUTH_CLIENT_SECRET'),
              authorize_url: '/login/oauth/authorize',
              token_url: '/login/oauth/access_token',
              site: 'https://github.com',
              raise_errors: false
            )
          end
        end
      end
    end
  end
end
