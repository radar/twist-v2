require_relative 'base_union'
require_relative 'objects/successful_login_result'
require_relative 'objects/failed_login_result'

module Twist
  module Web
    module GraphQL
      class LoginResult < BaseUnion
        description "The result from attempting a login"
        possible_types SuccessfulLoginResult, FailedLoginResult

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
