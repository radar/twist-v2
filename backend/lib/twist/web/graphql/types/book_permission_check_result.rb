module Twist
  module Web
    module GraphQL
      module Types
        class BookPermissionCheckResult < BaseUnion
          description "The result from attempting a login"
          possible_types Types::Book, Types::PermissionDenied

          def self.resolve_type(object, _context)
            if object.is_a?(Twist::Entities::Book)
              Types::Book
            else
              Types::PermissionDenied
            end
          end
        end
      end
    end
  end
end
