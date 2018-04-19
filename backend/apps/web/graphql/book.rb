require_relative 'branch'
require_relative 'element'

require_relative 'resolvers/branch'
require_relative 'resolvers/element'

module Web
  module GraphQL
    BookType = ::GraphQL::ObjectType.define do
      name "Book"
      description "A book"
      field :id, types.ID
      field :title, !types.String
      field :blurb, !types.String
      field :permalink, !types.String
      field :defaultBranch, BranchType do
        resolve Resolvers::Branch.new
      end

      field :elementsWithNotes, types[ElementType] do
        resolve Resolvers::Element::ByBook.new
      end
    end
  end
end
