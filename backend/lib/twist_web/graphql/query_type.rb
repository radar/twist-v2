require 'twist/authorization/book'

require_relative 'resolver'
require_relative 'resolvers/books'
require_relative 'resolvers/book'
require_relative 'resolvers/comments'
require_relative 'resolvers/elements_with_notes'
require_relative 'resolvers/note'
require_relative 'resolvers/users'

module Twist
  module Web
    module GraphQL
      class QueryType < ::GraphQL::Schema::Object
        graphql_name "Query"
        description "The query root of this schema"

        field :books, [BookType], null: false, resolver: Resolvers::Books

        field :users, [UserType], null: false, resolver: Resolvers::Users do
          argument :github_login, String, required: true
        end

        field :book, BookPermissionCheckResult, null: false, resolver: Resolvers::Book do
          argument :permalink, String, required: true
        end

        field :elements_with_notes, [ElementType], null: false, resolver: Resolvers::ElementsWithNotes do
          argument :book_permalink, String, required: true
          argument :state, Types::NoteState, required: true
        end

        field :note, NoteType, null: false, resolver: Resolvers::Note do
          argument :book_permalink, String, required: true
          argument :number, Integer, required: true
        end

        field :current_user, UserType, null: true

        field :comments, [CommentType], resolver: Resolvers::Comments, null: false do
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
