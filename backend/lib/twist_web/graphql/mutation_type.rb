require_relative 'objects/book'
require_relative 'objects/note'
require_relative 'objects/invitation'

require_relative 'mutations/comments/add'
require_relative 'mutations/comments/update'
require_relative 'mutations/comments/delete'

require_relative 'mutations/notes/close'
require_relative 'mutations/notes/open'
require_relative 'mutations/notes/submit'
require_relative 'mutations/notes/update'

require_relative 'mutations/users/authenticate'

require_relative 'mutations/invitations/invite'
require_relative 'mutations/readers/remove'

module Twist
  module Web
    module GraphQL
      class MutationType < ::GraphQL::Schema::Object
        graphql_name "Mutations"

        field :login, mutation: Mutations::Users::Authenticate

        field :submit_note, mutation: Mutations::Notes::Submit
        field :close_note, mutation: Mutations::Notes::Close
        field :open_note, mutation: Mutations::Notes::Open
        field :update_note, mutation: Mutations::Notes::Update

        field :add_comment, mutation: Mutations::Comments::Add
        field :update_comment, mutation: Mutations::Comments::Update
        field :delete_comment, mutation: Mutations::Comments::Delete

        field :invite_user, mutation: Mutations::Invitations::Invite
        field :remove_reader, mutation: Mutations::Readers::Remove
      end
    end
  end
end
