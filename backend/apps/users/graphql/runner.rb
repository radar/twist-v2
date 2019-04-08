module Users
  module GraphQL
    class Runner
      def initialize(repos:)
        @repos = repos
      end

      def run(query:, variables: {}, context: {})
        Users::GraphQL::Schema.execute(
          query,
          variables: variables,
          context: context.merge(
            user_repo: repo(:user)
          ),
        )
      end

      private

      attr_reader :repos

      def repo(name)
        repos[name] || NullRepository.new(name)
      end
    end
  end
end
