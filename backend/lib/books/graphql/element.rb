module Books
  module GraphQL
    ElementType = ::GraphQL::ObjectType.define do
      name "Element"
      description "An element"

      field :id, types.ID
      field :content, types.String
      field :tag, types.String
      field :noteCount, types.Int do
        resolve Resolvers::Notes::Count.new
      end
    end
  end
end
