module Web
  module GraphQL
    class Runner
      def initialize(repos:)
        @repos = repos
      end

      def run(query:, variables: {}, context: {})
        unless authenticated?(context[:current_user])
          return {
            "success" => false,
            "error" => "You must be authenticated before using this API.",
          }
        end

        result = Web::GraphQL::Schema.execute(
          query,
          variables: variables,
          context: context.merge(all_loaders).merge(all_repos),
        )
        result.merge(success: true)
      end

      private

      attr_reader :repos

      def all_loaders
        {
          branch_loader: branch_loader,
          commit_loader: commit_loader,
          element_loader: element_loader,
          image_loader: image_loader,
          note_count_loader: note_count_loader,
          user_loader: user_loader,
        }
      end

      def all_repos
        {
          book_repo: repo(:book),
          branch_repo: repo(:branch),
          chapter_repo: repo(:chapter),
          comment_repo: repo(:comment),
          commit_repo: repo(:commit),
          book_note_repo: repo(:book_note),
          element_repo: repo(:element),
          image_repo: repo(:image),
          note_repo: repo(:note),
          user_repo: repo(:user),
        }
      end

      def repo(name)
        repos[name] || NullRepository.new(name)
      end

      def branch_loader
        Dataloader.new do |ids|
          ids.empty? ? [] : repo(:branch).by_ids(ids)
        end
      end

      def commit_loader
        Dataloader.new do |ids|
          ids.empty? ? [] : repo(:commit).by_ids(ids)
        end
      end

      def element_loader
        Dataloader.new do |ids|
          ids.empty? ? [] : repo(:element).by_ids(ids)
        end
      end

      def image_loader
        Dataloader.new do |ids|
          ids.empty? ? [] : repo(:image).by_ids(ids)
        end
      end

      def note_count_loader
        Dataloader.new do |element_ids|
          element_ids.empty? ? [] : repo(:note).count(element_ids)
        end
      end

      def user_loader
        Dataloader.new do |ids|
          ids.empty? ? [] : repo(:user).by_ids(ids)
        end
      end

      def authenticated?(user)
        !!user
      end
    end
  end
end
