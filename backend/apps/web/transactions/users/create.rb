module Web
  module Transactions
    module Users
      class Create
        include Dry::Transaction
        include Import["user_repo"]

        step :encrypt_password
        step :persist

        # TODO: check to see if password matches confirmation

        def encrypt_password(input)
          input[:password] = BCrypt::Password.create(input[:password])
          Success(input)
        end

        def persist(input)
          user = user_repo.create(
            email: input[:email],
            encrypted_password: input[:password],
          )
          Success(user)
        end
      end
    end
  end
end
