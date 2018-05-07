require_relative 'branch'
require_relative 'element'
require_relative 'note'

require_relative 'resolvers/branch'
require_relative 'resolvers/element'
require_relative 'resolvers/note'

module Web
  module GraphQL
    class BookType < ::GraphQL::Schema::Object
      graphql_name "Book"
      description "A book"

      field :id, ID, null: false
      field :title, String, null: false
      field :blurb, String, null: false
      field :permalink, String, null: false
      field :defaultBranch, BranchType, null: false

      field :note, NoteType, null: false do
        argument :id, ID, required: true
      end

      def default_branch
        context[:branch_repo].by_book(object.id).detect(&:default)
      end

      def note(id:)
        context[:book_note_repo].by_book_and_id(object.id, id)
      end
    end
  end
end
