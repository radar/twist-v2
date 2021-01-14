module Twist
  module Web
    module GraphQL
      class Resolver
        def self.call(object, arguments, context)
          resolver = new(object: object, context: context)
          resolver.call(**arguments)
        end

        def initialize(object:, context:)
          @object = object
          @context = context
        end

        def current_user
          context[:current_user]
        end

        private

        attr_reader :object, :context
      end
    end
  end
end
