module Books
  module GraphQL
    ElementType = ::GraphQL::ObjectType.define do
      name "Element"
      description "An element"

      field :id, types.ID
      field :content, types.String
    end
  end
end
