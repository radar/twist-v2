module Twist
  module Web
    Router = Hanami::Router.new do
      post '/graphql', to: Controllers::Graphql::Run
      options '/graphql', to: Controllers::Graphql::Run
    end
  end
end
