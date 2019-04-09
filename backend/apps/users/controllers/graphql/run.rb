module Users
  module Controllers
    module Graphql
      class Run
        include Users::Action
        include ::Controllers::CORS
        include ::Controllers::CurrentUser

        include Web::Import["user_repo"]

        def call(params)
          variables = Hanami::Utils::Hash.stringify(params[:variables] || {})
          current_user = find_current_user(params.env["HTTP_AUTHORIZATION"])
          runner = Users::GraphQL::Runner.new(
            repos: {
              user: user_repo,
            },
          )
          result = runner.run(
            query: params[:query],
            variables: variables,
            context: {
              current_user: current_user,
            },
          )

          self.format = :json
          self.body = result.to_json
        end

        private

        def verify_csrf_token?
          false
        end
      end
    end
  end
end
