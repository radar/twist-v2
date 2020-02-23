module Twist
  class Book < ROM::Struct
    def path
      git = Git.new(
        username: github_user,
        repo: github_repo,
      )
      git.local_path
    end
  end
end
