module Twist
  module Web
    module GraphQL
      class BaseMutation < ::GraphQL::Schema::RelayClassicMutation
        argument_class Types::BaseArgument
        field_class Types::BaseField
        input_object_class Types::BaseInputObject
        object_class Types::BaseObject
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
