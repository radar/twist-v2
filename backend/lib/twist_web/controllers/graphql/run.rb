require_relative "../cors"

module Twist
  module Web
    module Controllers
      module Graphql
        class Run < Hanami::Action
          include Web::Controllers::CORS

          %w(
            book book_note branch chapter comment commit element footnote image note permission user
          ).each do |repo|
            include Twist::Import["repositories.#{repo}_repo"]
          end

          # rubocop:disable Metrics/AbcSize
          def handle(req, res)
            params = req.params
            variables = Hanami::Utils::Hash.stringify(params[:variables] || {})
            current_user = find_current_user(params.env["HTTP_AUTHORIZATION"])

            runner = Web::GraphQL::Runner.new(
              repos: {
                book: book_repo,
                book_note: book_note_repo,
                branch: branch_repo,
                chapter: chapter_repo,
                comment: comment_repo,
                commit: commit_repo,
                element: element_repo,
                footnote: footnote_repo,
                note: note_repo,
                user: user_repo,
                image: image_repo,
                permission: permission_repo,
              },
            )

            result = runner.run(
              query: params[:query],
              variables: variables,
              context: {
                current_user: current_user,
              },
            )

            res.format = :json
            res.body = result.to_json
          end
          # rubocop:enable Metrics/AbcSize

          private

          def verify_csrf_token?
            false
          end

          def find_current_user(token)
            return unless token

            token = token.split.last
            return unless token

            payload, _headers = JWT.decode token, ENV.fetch('AUTH_TOKEN_SECRET'), true, algorithm: 'HS256'
            user_repo = Repositories::UserRepo.new
            user_repo.find_by_email(payload["email"])
          end
        end
      end
    end
  end
end
