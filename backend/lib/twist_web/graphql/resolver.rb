module Twist
  module Web
    module GraphQL
      class Resolver < ::GraphQL::Schema::Resolver
        def current_user
          context[:current_user]
        end
      end
    end
  end
end
