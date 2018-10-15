require_relative 'note'

require_relative 'mutations/note'
require_relative 'mutations/user'

module Web
  module GraphQL
    class MutationType < ::GraphQL::Schema::Object
      graphql_name "Mutations"

      field :login, LoginResultType, null: true do
        description "Login attempt"
        argument :email, String, required: true
        argument :password, String, required: true
      end

      field :submit_note, NoteType, null: true do
        argument :element_id, String, required: true
        argument :text, String, required: true

      end

      field :close_note, NoteType, null: true do
        argument :id, ID, required: true
      end

      field :openNote, NoteType, null: true do
        argument :id, ID, required: true
      end

      def login(email:, password:)
        Mutations::User::Authenticate.new.(
          context[:user_repo],
          email: email,
          password: password,
        )
      end

      def submit_note(element_id:, text:)
        Mutations::Note::Submit.new.(
          note_repo: context[:note_repo],
          current_user: context[:current_user].id,
          element_id: element_id,
          text: text,
        )
      end

      def close_note(id:)
        Mutations::Note::Close.new.(context[:note_repo], id)
      end

      def open_note(id:)
        Mutations::Note::Open.new.(context[:note_repo], id)
      end
    end
  end
end
