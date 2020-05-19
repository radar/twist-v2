module Twist
  module Web
    module GraphQL
      class BookPermissionCheckResult < BaseUnion
        description "The result from attempting a login"
        possible_types BookType, PermissionDeniedType

        def self.resolve_type(object, _context)
          if object.is_a?(Twist::Book)
            BookType
          else
            PermissionDeniedType
          end
        end
      end
    end
  end
end
