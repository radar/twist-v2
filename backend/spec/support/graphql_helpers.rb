module GraphQLHelpers
  class QueryException < StandardError; end;

  def run_query!
    result = subject.run(query: query, variables: variables, context: context)
    if !result["errors"].nil? && result["errors"].any?
      raise QueryException, result["errors"][0]["message"]
    end

    result
  end
end

RSpec.configure do |c|
  c.include GraphQLHelpers
end
