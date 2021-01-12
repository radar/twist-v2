require "requests_helper"

module Twist
  describe "Users", type: :request do
    let!(:create_user) { Twist::Container["transactions.users.create"] }
    let!(:user_1) do
      create_user.(
        email: "me@ryanbigg.com",
        password: "password",
        name: "Ryan Bigg",
        github_login: "radar"
      ).success
    end

    let!(:user_2) do
      create_user.(
        email: "twist@ryanbigg.com",
        password: "password",
        name: "Twist Books",
        github_login: "twist-books"
      ).success
    end

    let(:query) do
      %|
        query users($githubLogin: String!) {
          users(githubLogin: $githubLogin) {
            githubLogin
            name
          }
        }
      |
    end

    it "finds all users matching login" do
      variables = {
        githubLogin: "twist",
      }

      query!(query: query, variables: variables, user: user_1)

      users = json_body.dig("data", "users")

      expect(users.count).to eq(1)
      expect(users.first["githubLogin"]).to eq("twist-books")
      expect(users.first["name"]).to eq("Twist Books")
    end
  end
end
