module Users
  module GraphQL
    class SuccessfulLoginResult < ::GraphQL::Schema::Object
      field :email, String, null: false
      field :token, String, null: false

      def email
        object.success[:email]
      end

      def token
        object.success[:token]
      end
    end
  end
end
