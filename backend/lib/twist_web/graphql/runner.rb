module Twist
  module Web
    module GraphQL
      class Runner
        def initialize(repos:)
          @repos = repos
        end

        # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
        def run(query:, variables: {}, context: {})
          Web::GraphQL::Schema.execute(
            query,
            variables: variables,
            context: context.merge(
              branch_loader: branch_loader,
              commit_loader: commit_loader,
              element_loader: element_loader,
              image_loader: image_loader,
              note_count_loader: note_count_loader,
              user_loader: user_loader,
              book_repo: repo(:book),
              branch_repo: repo(:branch),
              chapter_repo: repo(:chapter),
              comment_repo: repo(:comment),
              commit_repo: repo(:commit),
              book_note_repo: repo(:book_note),
              element_repo: repo(:element),
              footnote_repo: repo(:footnote),
              image_repo: repo(:image),
              note_repo: repo(:note),
              user_repo: repo(:user),
            ),
          )
        end
        # rubocop:enable Metrics/MethodLength, Metrics/AbcSize

        private

        attr_reader :repos

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
            ids.empty? ? [] : repo(:user).by_ids(ids).map { |user| [user.id, user] }.to_h
          end
        end
      end
    end
  end
end
