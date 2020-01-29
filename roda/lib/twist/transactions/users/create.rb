require "bcrypt"

module Web
  module Transactions
    module Users
      class Create
        include Dry::Transaction
        include Twist::Import["user_repo"]

        step :encrypt_password
        step :persist

        def encrypt_password(input)
          input[:password] = BCrypt::Password.create(input[:password])
          Success(input)
        end

        def persist(input)
          user = user_repo.create(
            email: input[:email],
            name: input[:name],
            github_login: input[:github_login],
            encrypted_password: input[:password],
          )
          Success(user)
        end
      end
    end
  end
end
