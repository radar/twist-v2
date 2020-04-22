module Twist
  module Web
    module GraphQL
      class PermissionDeniedType < ::GraphQL::Schema::Object
        field :error, type: String, null: false

        def error
          'You do not have permission to access that book.'
        end
      end
    end
  end
end
