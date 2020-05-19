module Twist
  module Repositories
    class CommitRepo < Twist::Repository[:commits]
      commands :create, use: :timestamps, plugins_options: { timestamps: { timestamps: %i(created_at updated_at) } }

      def latest_for_branch(branch_id)
        by_branch(branch_id)
          .order { created_at.desc }
          .limit(1)
          .one!
      end

      def by_branch(branch_id)
        by_branch(branch_id).to_a
      end

      def latest_for_default_branch(book_id)
        commits.latest_for_default_branch(book_id)
      end

      def by_book_and_sha(book_id, short_sha)
        commits.by_book_and_sha(book_id, short_sha)
      end

      def latest_for_book_and_ref(book_id, ref)
        commits.latest_for_book_and_ref(book_id, ref)
      end

      def by_id(id)
        commits.by_pk(id).one
      end

      def by_ids(ids)
        commits.where(id: ids).to_a
      end

      def find_and_clean_or_create(branch_id, sha, chapter_repo)
        fields = { branch_id: branch_id, sha: sha }

        commit = commits.where(fields).limit(1).one
        if commit
          chapter_repo.mark_as_superseded(commit.id)
          commit
        else
          create(fields)
        end
      end

      private

      def by_branch(branch_id)
        commits.where(branch_id: branch_id)
      end
    end
  end
end
