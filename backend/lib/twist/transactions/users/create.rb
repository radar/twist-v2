require "bcrypt"

module Twist
  module Transactions
    module Users
      class Create < Transaction
        include Twist::Import["repositories.user_repo"]

        def call(email:, name:, password:, github_login: nil)
          encrypted_password = yield encrypt_password(password)
          persist(
            email: email,
            name: name,
            encrypted_password: encrypted_password,
            github_login: github_login,
          )
        end

        def encrypt_password(password)
          encrypted_password = BCrypt::Password.create(password)
          Success(encrypted_password)
        end

        def persist(email:, name:, github_login:, encrypted_password:)
          user = user_repo.create(
            email: email,
            name: name,
            github_login: github_login,
            encrypted_password: encrypted_password,
          )
          Success(user)
        end
      end
    end
  end
end
