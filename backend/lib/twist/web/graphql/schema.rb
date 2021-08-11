require 'graphql'

module Twist
  module Web
    module GraphQL
      class Schema < ::GraphQL::Schema
        lazy_resolve(Promise, :sync)

        query QueryType
        mutation MutationType
      end
    end
  end
end
