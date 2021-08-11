module Twist
  module Web
    module GraphQL
      class BaseMutation < ::GraphQL::Schema::Mutation
        null false

        def handle_result(result)
          if result.success?
            yield
          else
            { error: result.failure }
          end
        end
      end
    end
  end
end
