module Web::Controllers::Graphql
  class Run
    include Web::Action

    def call(params)
      result = Books::GraphQL::Schema.execute(
        params[:query],
        variables: params[:variables],
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
