module Twist
  module Web
    Router = Hanami::Router.new do
      post '/graphql', to: Controllers::Graphql::Run
      options '/graphql', to: Controllers::Graphql::Run

      post '/books/:permalink/receive', to: Controllers::Books::Receive
    end
  end
end
