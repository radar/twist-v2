require 'twist_web/graphql/objects/permission_denied'

module Twist
  module Web
    module GraphQL
      module Mutations
        module Invitations
          class InvitePermissionResult < BaseUnion
            description "The result from attempting an invite"
            possible_types InvitationType, PermissionDeniedType

            def self.resolve_type(object, _context)
              if object.success?
                InvitationType
              else
                PermissionDeniedType
              end
            end
          end
        end
      end
    end
  end
end
