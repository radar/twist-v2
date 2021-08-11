module Twist
  module Web
    Router = Hanami::Router.new do
      if ENV['APP_ENV'] == "development"
        require 'sidekiq/web'
        mount Sidekiq::Web, at: '/sidekiq'
      end

      post '/graphql', to: Controllers::GraphQL::Run.new
      options '/graphql', to: Controllers::GraphQL::Run.new

      post '/books/:permalink/receive', to: Controllers::Books::Receive.new

      get '/oauth/authorize', to: Controllers::Oauth::Authorize.new
      get '/oauth/callback', to: Controllers::Oauth::Callback.new
    end
  end
end
