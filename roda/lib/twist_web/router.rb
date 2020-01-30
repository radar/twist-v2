require "roda"

module Twist
  module Web
    class Router < Roda
      plugin :json_parser

      route do |r|
        # GET / request
        r.root do
          r.halt [200, {}, ["OK"]]
        end

        r.post "graphql" do
          r.halt Controllers::Graphql::Run.new.call(r.params)
        end
      end
    end
  end
end
