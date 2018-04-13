require_relative 'resolvers/user'

module Books
  module GraphQL
    NoteType = ::GraphQL::ObjectType.define do
      name "Note"
      description "A note"
      field :id, types.ID
      field :createdAt, types.String do
        resolve ->(obj, _args, _ctx) { obj.created_at.iso8601 }
      end
      field :text, types.String
      field :user, UserType do
        resolve Resolvers::User::ByID.new
      end
    end
  end
end
