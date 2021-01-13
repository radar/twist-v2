module Twist
  class Book < ROM::Struct
    attribute :id, Types::Integer
    attribute :title, Types::String
    attribute :permalink, Types::String

    def path
      git = Git.new(
        username: github_user,
        repo: github_repo,
      )
      git.local_path
    end
  end
end
