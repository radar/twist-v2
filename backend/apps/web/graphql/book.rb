require_relative 'branch'
require_relative 'element'
require_relative 'note'

require_relative 'resolvers/branch'
require_relative 'resolvers/element'
require_relative 'resolvers/note'

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
        resolve Resolvers::Branch::Default.new
      end

      field :note, NoteType do
        argument :id, !types.ID

        resolve Resolvers::Note::ById.new
      end
    end
  end
end
