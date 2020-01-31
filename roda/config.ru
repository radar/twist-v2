require './config/environment'

use Hanami::Middleware::BodyParser, :json
run Twist::Web::Router
