module Twist
  module Relations
    class Users < ROM::Relation[:sql]
      schema(:users, infer: true)

      def by_github_login(login)
        where { github_login.ilike("#{login}%") }
      end
    end
  end
end
