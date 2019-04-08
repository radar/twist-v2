require_relative 'objects/book'
require_relative 'objects/note'

require_relative 'mutations/comments/add'

require_relative 'mutations/notes/close'
require_relative 'mutations/notes/open'
require_relative 'mutations/notes/submit'

module Web
  module GraphQL
    class MutationType < ::GraphQL::Schema::Object
      graphql_name "Mutations"

      field :submit_note, mutation: Mutations::Notes::Submit
      field :close_note, mutation: Mutations::Notes::Close
      field :open_note, mutation: Mutations::Notes::Open

      field :add_comment, mutation: Mutations::Comments::Add
    end
  end
end
