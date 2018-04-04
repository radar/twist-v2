module Books
  module GraphQL
    BookType = ::GraphQL::ObjectType.define do
      name "Book"
      description "A book"
      field :id, types.ID
      field :title, !types.String
      field :blurb, !types.String
      field :permalink, !types.String
      field :defaultBranch, BranchType do
        resolve Books::GraphQL::Resolvers::Branch.new
      end
    end
  end
end
