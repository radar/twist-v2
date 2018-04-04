module Web::Controllers::Graphql
  class Run
    include Web::Action

    def call(params)
      variables = params[:variables] || {}
      find_current_user(params.env["HTTP_AUTHORIZATION"])
      result = Books::GraphQL::Schema.execute(
        params[:query],
        # Stringify the variable keys here, as that's what GraphQL-Ruby expects them to be
        # Time spent discovering this: ~ 1 hour.
        variables: Hanami::Utils::Hash.stringify(params[:variables]),
        context: {
          current_user: find_current_user(params.env["HTTP_AUTHORIZATION"])
        }
      )

      headers["Access-Control-Allow-Origin"] = '*'
      headers["Access-Control-Allow-Headers"] = 'Content-Type, Authorization'
      headers["Access-Control-Request-Method"] = '*'

      self.format = :json
      self.body = result.to_json

    end

    def verify_csrf_token?
      false
    end

    def find_current_user(token)
      return unless token
      user_repo = UserRepository.new
      user_repo.find_by_auth_token(token.split.last)
    end
  end
end
