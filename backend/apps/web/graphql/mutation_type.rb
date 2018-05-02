require_relative 'note'

require_relative 'mutations/note'
require_relative 'mutations/user'


module Web
  module GraphQL
    MutationType = ::GraphQL::ObjectType.define do
      name "Mutations"

      field :login, LoginResultType do
        description "Login attempt"
        argument :email, !types.String
        argument :password, !types.String

        resolve Mutations::User::Authenticate.new
      end

      field :submitNote, NoteType do
        argument :elementID, !types.String
        argument :text, !types.String

        resolve Mutations::Note::Submit.new
      end
    end
  end
end
