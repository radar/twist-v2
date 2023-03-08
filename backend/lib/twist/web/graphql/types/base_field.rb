module Twist
  module Web
    module GraphQL
      module Types
        class BaseField < GraphQL::Schema::Field
          argument_class Types::BaseArgument
        end
      end
    end
  end
end
