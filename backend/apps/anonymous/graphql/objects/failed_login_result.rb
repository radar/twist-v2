module Anonymous
  module GraphQL
    class FailedLoginResult < ::GraphQL::Schema::Object
      field :error, String, null: false

      def error
        object.failure
      end
    end
  end
end
