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

        field :books, [BookType], null: false, resolve: Resolvers::Books

        field :book, BookPermissionCheckResult, null: false, resolve: Resolvers::Book do
          argument :permalink, String, required: true
        end

        field :elements_with_notes, [ElementType], null: false, resolve: Resolvers::ElementsWithNotes do
          argument :book_permalink, String, required: true
          argument :state, Types::NoteState, required: true
        end

        field :note, NoteType, null: false, resolve: Resolvers::Note do
          argument :book_permalink, String, required: true
          argument :number, Integer, required: true
        end

        field :current_user, UserType, null: true

        field :comments, [CommentType], resolve: Resolvers::Comments, null: false do
          argument :note_id, ID, required: true
        end

        field :users, [UserType], null: false, resolve: Resolvers::Users do
          argument :github_login, String, required: true
        end

        def current_user
          context[:current_user]
        end
      end
    end
  end
end
