module Web::Controllers::Graphql
  class Run
    include Web::Action

    before :set_cors_headers

    def call(params)
      variables = Hanami::Utils::Hash.stringify(params[:variables] || {})
      current_user = find_current_user(params.env["HTTP_AUTHORIZATION"])

      result = Web::GraphQL::Runner.new.run(
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

    def set_cors_headers
      headers["Access-Control-Allow-Origin"] = '*'
      headers["Access-Control-Allow-Headers"] = 'Content-Type, Authorization'
      headers["Access-Control-Request-Method"] = '*'
    end

    def verify_csrf_token?
      false
    end

    def find_current_user(token)
      return unless token
      token = token.split.last
      return unless token
      payload, _headers = JWT.decode token, ENV.fetch('AUTH_TOKEN_SECRET'), true, { algorithm: 'HS256' }
      user_repo = UserRepository.new
      user_repo.find_by_email(payload["email"])
    end
  end
end
