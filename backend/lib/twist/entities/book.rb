module Twist
  module Entities
    class Book < ROM::Struct
      attribute :id, Types::Integer
      attribute :title, Types::String
      attribute :permalink, Types::String
      attribute :github_user, Types::String
      attribute :github_repo, Types::String

      def path
        git = Git.new(
          username: github_user,
          repo: github_repo,
        )
        git.local_path
      end
    end
  end
end
