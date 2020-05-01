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
        field :latestCommit, CommitType, null: false do
          argument :git_ref, String, required: false
        end

        field :commit, CommitType, null: false do
          argument :git_ref, String, required: false
        end

        field :notes, [NoteType], null: false do
          argument :elementId, String, required: true
        end

        def notes(element_id:)
          context[:book_note_repo].by_book_and_element(object.id, element_id)
        end

        def latest_commit(git_ref: nil)
          commit = commit_repo.latest_for_book_and_ref(object.id, git_ref) if git_ref
          commit || commit_repo.latest_for_default_branch(object.id)
        end

        def commit(git_ref: nil)
          if git_ref
            commit = commit_repo.by_book_and_sha(object.id, git_ref)
            commit || commit_repo.latest_for_book_and_ref(object.id, git_ref)
          else
            latest_commit
          end
        end

        def default_branch
          context[:branch_repo].by_book(object.id).detect(&:default)
        end

        def commit_repo
          context[:commit_repo]
        end
      end
    end
  end
end
