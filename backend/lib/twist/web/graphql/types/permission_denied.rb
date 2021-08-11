module Twist
  module Web
    module GraphQL
      module Types
        class PermissionDenied < ::GraphQL::Schema::Object
          field :error, type: String, null: false

          def error
            'You do not have permission to access that book.'
          end
        end
      end
    end
  end
end
