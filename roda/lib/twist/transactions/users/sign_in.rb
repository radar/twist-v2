require 'dry/transaction'

module Web
  module Transactions
    module Users
      class SignIn
        include Dry::Transaction

        step :find_user
        step :authenticate

        def find_user(input)
          repo = UserRepository.new
          user = repo.find_by_email(input[:email])
          user ? Success(user: user, password: input[:password]) : Failure(nil)
        end

        def authenticate(user:, password:)
          user.correct_password?(password) ? Success(user) : Failure(nil)
        end
      end
    end
  end
end
