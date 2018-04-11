require_relative 'note'
require_relative 'resolvers/note'

module Books
  module GraphQL
    ElementType = ::GraphQL::ObjectType.define do
      name "Element"
      description "An element"

      field :id, types.ID
      field :content, types.String
      field :tag, types.String
      field :noteCount, types.Int do
        resolve Resolvers::Note::Count.new
      end

      field :notes, types[NoteType] do
        resolve Resolvers::Note::ByElement.new
      end
    end
  end
end
