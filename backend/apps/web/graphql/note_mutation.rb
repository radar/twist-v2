require_relative 'resolvers/note'

module Web
  module GraphQL
    SubmitNoteMutationType = ::GraphQL::ObjectType.define do
      name "SubmitNote"

      field :submitNote, NoteType do
        argument :elementID, !types.String
        argument :text, !types.String

        resolve Resolvers::Note::Submit.new
      end
    end
  end
end
