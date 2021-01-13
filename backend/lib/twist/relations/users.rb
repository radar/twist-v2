module Twist
  module Relations
    class Users < ROM::Relation[:sql]
      schema(:users, infer: true)

      def by_github_login(login)
        where { github_login.ilike("#{login}%") }
      end

      def by_book(book_id)
        join(:permissions, user_id: :id)
          .where(book_id: book_id)
      end
    end
  end
end
