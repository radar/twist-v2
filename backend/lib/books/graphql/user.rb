module Books
  module GraphQL
    UserType = ::GraphQL::ObjectType.define do
      name "User"
      description "A user"

      field :id, types.ID
      field :email, types.String
    end
  end
end
