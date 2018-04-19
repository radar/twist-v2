require_relative 'note'

require_relative 'resolvers/note'
require_relative 'resolvers/user'

module Web
  module GraphQL
    Mutations = ::GraphQL::ObjectType.define do
      name "Mutations"

      field :login, LoginResultType do
        description "Login attempt"
        argument :email, !types.String
        argument :password, !types.String

        resolve Resolvers::User::Authenticate.new
      end

      field :createNote, NoteType do
        argument :elementID, !types.String
        argument :text, !types.String

        resolve Resolvers::Note::Submit.new
      end
    end
  end
end
