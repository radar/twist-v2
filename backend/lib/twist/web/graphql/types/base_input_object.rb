module Twist
  module Web
    module GraphQL
      module Types
        class BaseInputObject < GraphQL::Schema::InputObject
          argument_class Types::BaseArgument
        end
      end
    end
  end
end
