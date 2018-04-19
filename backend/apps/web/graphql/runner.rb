module Web
  module GraphQL
    class Runner
      include Import["user_repo"]
      include Import["note_repo"]
      include Import["image_repo"]

      def run(query:, variables: {}, context: {})
        result = Web::GraphQL::Schema.execute(
          query,
          variables: variables,
          context: context.merge(
            user_repo: user_repo,
            user_loader: user_loader,
            note_count_loader: note_count_loader,
            image_loader: image_loader,
          )
        )
      end

      private

      def user_loader
        Dataloader.new { |ids| user_repo.by_ids(ids).to_a }
      end

      def note_count_loader
        Dataloader.new { |element_ids| note_repo.count(element_ids) }
      end

      def image_loader
        Dataloader.new { |ids| image_repo.by_ids(ids).to_a }
      end
    end
  end
end
