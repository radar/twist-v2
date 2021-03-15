require_relative "../cors"

module Twist
  module Web
    module Controllers
      module Graphql
        class Run < Hanami::Action
          include Web::Controllers::CORS
          include Twist::Import["transactions.users.find_current_user"]

          %w(
            book book_note branch chapter comment commit element footnote image note permission user reader
          ).each do |repo|
            include Twist::Import["repositories.#{repo}_repo"]
          end

          # rubocop:disable Metrics/AbcSize
          def handle(req, res)
            params = req.params
            variables = Hanami::Utils::Hash.stringify(params[:variables] || {})
            find_user_result = find_current_user.(params.env["HTTP_AUTHORIZATION"])

            if find_user_result.failure?
              res.status = 403
              return
            end

            current_user = find_user_result.success

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
                reader: reader_repo,
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
        end
      end
    end
  end
end
