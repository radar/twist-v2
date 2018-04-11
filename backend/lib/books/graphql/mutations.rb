module Books
  module GraphQL
    Mutations = ::GraphQL::ObjectType.define do
      name "Mutations"

      field :login, types.String do
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
