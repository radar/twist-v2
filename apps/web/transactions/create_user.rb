module Web
  module Transactions
    class CreateUser
      include Dry::Transaction

      step :encrypt_password
      step :persist

      # TODO: check to see if password matches confirmation

      def encrypt_password(input)
        input[:password] = BCrypt::Password.create(input[:password])
        Success(input)
      end

      def persist(input, user_repo)
        user = user_repo.create(
          email: input[:email],
          encrypted_password: input[:password],
        )
        Success(user)
      end
    end
  end
end
