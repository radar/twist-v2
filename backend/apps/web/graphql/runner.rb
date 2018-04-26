module Web
  module GraphQL
    class Runner
      include Import["branch_repo"]
      include Import["commit_repo"]
      include Import["image_repo"]
      include Import["note_repo"]
      include Import["user_repo"]

      def run(query:, variables: {}, context: {})
        Web::GraphQL::Schema.execute(
          query,
          variables: variables,
          context: context.merge(
            branch_loader: branch_loader,
            commit_loader: commit_loader,
            image_loader: image_loader,
            note_count_loader: note_count_loader,
            user_loader: user_loader,
            user_repo: user_repo,
          ),
        )
      end

      private

      def branch_loader
        Dataloader.new { |ids| branch_repo.by_ids(ids).to_a }
      end

      def commit_loader
        Dataloader.new { |ids| commit_repo.by_ids(ids).to_a }
      end

      def image_loader
        Dataloader.new { |ids| image_repo.by_ids(ids).to_a }
      end

      def note_count_loader
        Dataloader.new { |element_ids| note_repo.count(element_ids) }
      end

      def user_loader
        Dataloader.new { |ids| user_repo.by_ids(ids).to_a }
      end
    end
  end
end
