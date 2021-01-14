module Twist
  module Transactions
    module Users
      class SignIn < Transaction

        def call(email:, password:)
          user = yield find_user(email: email)
          yield authenticate(user: user, password: password)
        end

        def find_user(email:)
          repo = UserRepo.new
          user = repo.find_by_email(:email)
          user ? Success(user) : Failure(nil)
        end

        def authenticate(user:, password:)
          user.correct_password?(password) ? Success(user) : Failure(nil)
        end
      end
    end
  end
end
