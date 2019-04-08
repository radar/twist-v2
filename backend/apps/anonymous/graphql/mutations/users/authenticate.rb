require_relative '../../objects/login_result'

module Anonymous
  module GraphQL
    module Mutations
      module Users
        class Authenticate < BaseMutation
          type LoginResult

          description "Attempt a login"

          argument :email, String, required: true
          argument :password, String, required: true

          def resolve(email:, password:)
            authenticate = Transactions::Users::Authenticate.new(
              user_repo: context[:user_repo],
            )
            authenticate.(email: email, password: password)
          end
        end
      end
    end
  end
end
