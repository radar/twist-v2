module Twist
  module Web
    module GraphQL
      module Resolvers
        class Users < Resolver
          def call(github_login:)
            context[:user_repo].by_github_login(github_login)
          end
        end
      end
    end
  end
end
