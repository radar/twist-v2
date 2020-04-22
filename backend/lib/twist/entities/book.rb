module Twist
  class Book < ROM::Struct
    attribute :id, 'integer'
    attribute :title, 'string'
    attribute :permalink, 'string'

    def path
      git = Git.new(
        username: github_user,
        repo: github_repo,
      )
      git.local_path
    end
  end
end
