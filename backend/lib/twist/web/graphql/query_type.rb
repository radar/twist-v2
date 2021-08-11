module Twist
  module Web
    module GraphQL
      class QueryType < ::GraphQL::Schema::Object
        graphql_name "Query"
        description "The query root of this schema"

        field :books, [Types::Book], null: false, resolver: Resolvers::Books

        field :users, [Types::User], null: false, resolver: Resolvers::Users do
          argument :github_login, String, required: true
        end

        field :book, Types::BookPermissionCheckResult, null: false, resolver: Resolvers::Book do
          argument :permalink, String, required: true
        end

        field :elements_with_notes, [Types::Element], null: false, resolver: Resolvers::ElementsWithNotes do
          argument :book_permalink, String, required: true
          argument :state, Types::NoteState, required: true
        end

        field :note, Types::Note, null: false, resolver: Resolvers::Note do
          argument :book_permalink, String, required: true
          argument :number, Integer, required: true
        end

        field :current_user, Types::User, null: true

        field :comments, [Types::Comment], resolver: Resolvers::Comments, null: false do
          argument :note_id, ID, required: true
        end

        def current_user
          context[:current_user]
        end

        # def users(github_login:)
        #   context[:user_repo].by_github_login(github_login)
        # end
      end
    end
  end
end
