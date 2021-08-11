require "bcrypt"

module Twist
  module Transactions
    module Users
      class FindByGithubLogin < Transaction
        include Twist::Import["repositories.user_repo"]

        def call(login)
          user_repo.find_by_github_login(login)
        end
      end
    end
  end
end
