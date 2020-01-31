module Twist
  module Web
    module GraphQL
      class BookType < ::GraphQL::Schema::Object
        require_relative 'branch'

        graphql_name "Book"
        description "A book"

        field :id, ID, null: false
        field :title, String, null: false
        field :blurb, String, null: false
        field :permalink, String, null: false
        field :defaultBranch, BranchType, null: false

        def default_branch
          context[:branch_repo].by_book(object.id).detect(&:default)
        end
      end
    end
  end
end
