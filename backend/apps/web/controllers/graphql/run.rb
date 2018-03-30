module Web::Controllers::Graphql
  class Run
    include Web::Action

    def call(params)
      variables = params[:variables] || {}
      result = Books::GraphQL::Schema.execute(
        params[:query],
        # Stringify the variable keys here, as that's what GraphQL-Ruby expects them to be
        # Time spent discovering this: ~ 1 hour.
        variables: variables.map { |k,v| [k.to_s, v] }.to_h,
      )

      headers["Access-Control-Allow-Origin"] = '*'
      headers["Access-Control-Allow-Headers"] = 'Content-Type'
      headers["Access-Control-Request-Method"] = '*'

      self.format = :json
      self.body = result.to_json

    end

    def verify_csrf_token?
      false
    end
  end
end
