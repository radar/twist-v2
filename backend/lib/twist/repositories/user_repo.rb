module Twist
  module Repositories
    class UserRepo < Twist::Repository[:users]
      commands :create, use: :timestamps, plugins_options: { timestamps: { timestamps: %i(created_at updated_at) } }

      def first
        users.one
      end

      def by_pk(id)
        users.by_pk(id).one
      end

      def by_ids(ids)
        users.by_pk(ids).to_a
      end

      def by_github_login(github_login)
        users.by_github_login(github_login).to_a
      end

      def find_by_github_login(login)
        users.where(github_login: login).one
      end

      def find_by_email(email)
        users.where(email: email).one
      end

      def by_book(book_id)
        users.by_book(book_id)
      end
    end
  end
end
