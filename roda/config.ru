require './config/environment'

run Twist::Web::Router.freeze.app
