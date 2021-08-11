module Twist
  module Web
    module GraphQL
      module Types
        class Book < ::GraphQL::Schema::Object
          graphql_name "Book"
          description "A book"

          field :id, ID, null: false
          field :title, String, null: false
          field :blurb, String, null: false
          field :permalink, String, null: false
          field :default_branch, Types::Branch, null: false
          field :latest_commit, Types::Commit, null: false do
            argument :git_ref, String, required: false
          end

          field :branches, [Types::Branch], null: false
          field :branch, Types::Branch, null: false do
            argument :name, String, required: true
          end

          field :commit, Types::Commit, null: false do
            argument :git_ref, String, required: false
          end

          field :notes, [Types::Note], null: false do
            argument :element_id, String, required: true
          end

          field :readers, [Types::Reader], null: false
          field :current_user_author, Boolean, null: false

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

          def branches
            context[:branch_repo].by_book(object.id)
          end

          def branch(name:)
            context[:branch_repo].find_by_book_id_and_name(object.id, name)
          end

          def current_user_author
            context[:permission_repo].author?(book_id: object.id, user_id: context[:current_user].id)
          end

          def readers
            readers = context[:reader_repo].by_book(object.id)
            readers.map do |reader|
              {
                id: reader.id,
                github_login: reader.github_login,
                name: reader.name,
                author: reader.author_for?(object.id),
              }
            end
          end
        end
      end
    end
  end
end
