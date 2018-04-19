module Web::Controllers::Graphql
  class Run
    include Web::Action

    before :set_cors_headers

    def call(params)
      variables = Hanami::Utils::Hash.stringify(params[:variables] || {})
      current_user = find_current_user(params.env["HTTP_AUTHORIZATION"])

      Web::GraphQL::Runner.new.run(
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
      user_repo = UserRepository.new
      user_repo.find_by_auth_token(token.split.last)
    end
  end
end
