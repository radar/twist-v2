module Twist
  module Web
    Router = Hanami::Router.new do
      post '/graphql', to: Controllers::Graphql::Run
      options '/graphql', to: Controllers::Graphql::Run

      post '/books/:permalink/receive', to: Controllers::Books::Receive

      get '/oauth/authorize', to: Controllers::Oauth::Authorize
      get '/oauth/callback', to: Controllers::Oauth::Callback
    end
  end
end
