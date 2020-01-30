module Twist
  module Repositories
    class UserRepo < Twist::Repository[:users]
      commands :create, use: :timestamps, plugins_options: { timestamps: { timestamps: %i(created_at updated_at) } }

      def by_pk(id)
        users.by_pk(id).one
      end

      def by_ids(ids)
        users.where(id: ids).to_a
      end

      def find_by_github_login(login)
        users.where(github_login: login).one
      end

      def find_by_email(email)
        users.where(email: email).one
      end
    end
  end
end
