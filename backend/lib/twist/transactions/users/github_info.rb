module Twist
  module Transactions
    module Users
      class GithubInfo
        def call(token:)
          client = Octokit::Client.new(access_token: token)
          github_user = client.user
          primary_email = client.emails.detect { |e| e[:primary] }[:email]
          {
            name: github_user.name,
            login: github_user.login,
            email: primary_email,
          }
        end
      end
    end
  end
end
