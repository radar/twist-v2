module Twist
  module Web
    module GraphQL
      module Types
        class LoginResult < BaseUnion
          description "The result from attempting a login"
          possible_types Types::SuccessfulLoginResult, Types::FailedLoginResult

          def self.resolve_type(object, _context)
            if object.success?
              SuccessfulLoginResult
            else
              FailedLoginResult
            end
          end
        end
      end
    end
  end
end
