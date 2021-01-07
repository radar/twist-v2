require 'spec_helper'

module Twist
  describe Web::GraphQL::Runner do
    context 'users' do
      let(:current_user) { double(User, id: 1) }
      let(:user_repo) { instance_double(Repositories::UserRepo) }
      let(:user_1) do
        Twist::User.new(
          id: 1,
          github_login: "radar",
          name: "Ryan Bigg",
        )
      end

      let(:user_2) do
        Twist::User.new(
          id: 2,
          github_login: "twist",
          name: "Twist Books",
        )
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

      subject do
        described_class.new(
          repos: {
            user: user_repo,
          }
        )
      end

      before do
        expect(user_repo).to receive(:by_github_login).with("radar") { [user_1] }
      end

      it "fetches the users matching the login" do
        result = subject.run(
          query: query,
          variables: { githubLogin: "radar" },
          context: { current_user: current_user },
        )

        users = result.dig("data", "users")
        expect(users.count).to eq(1)

        expect(users.first["githubLogin"]).to eq("radar")
        expect(users.first["name"]).to eq("Ryan Bigg")
      end
    end
  end
end
