module Books
  module GraphQL
    NoteType = ::GraphQL::ObjectType.define do
      name "Note"
      description "A note"
      field :id, types.ID
    end
  end
end
