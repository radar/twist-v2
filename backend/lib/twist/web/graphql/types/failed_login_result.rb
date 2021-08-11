module Twist
  module Web
    module GraphQL
      module Types
        class FailedLoginResult < ::GraphQL::Schema::Object
          field :error, String, null: false

          def error
            object.failure
          end
        end
      end
    end
  end
end
