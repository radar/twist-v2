require 'spec_helper'

describe Web::GraphQL::Runner do
  context 'login mutation' do
    let(:user_repo) { double }

    subject do
      described_class.new(
        repos: {
          user: user_repo,
        },
      )
    end

    # rubocop:disable Metrics/MethodLength
    def query(email, password)
      %|
        mutation loginMutation {
          login(email: "#{email}", password: "#{password}") {
            ... on SuccessfulLoginResult {
              email
              token
            }
            ... on FailedLoginResult {
              error
            }
          }
        }
      |
    end
    # rubocop:enable Metrics/MethodLength

    context 'when the credentials are valid' do
      let(:email) { "test@example.com" }
      let(:user) { double(User, id: 1, email: email) }

      before do
        allow(user_repo).to receive(:find_by_email) { user }
        allow(user).to receive(:correct_password?) { true }
        allow(user_repo).to receive(:regenerate_token) { "abc1234" }
      end

      it 'logs in successfully' do
        result = subject.run(query: query(email, "password"))
        login = result.dig("data", "login")
        expect(login["email"]).to_not be_nil
        expect(login["token"]).to_not be_nil
      end
    end

    context 'when the user cannot be found' do
      before do
        allow(user_repo).to receive(:find_by_email) { nil }
        expect(user_repo).not_to receive(:regenerate_token)
      end

      it 'fails to login' do
        result = subject.run(query: query(nil, "fail"))
        login = result.dig("data", "login")
        expect(login["error"]).to_not be_nil
      end
    end

    context 'when the password is invalid' do
      let(:email) { "test@example.com" }
      let(:user) { double(User, id: 1) }

      before do
        allow(user_repo).to receive(:find_by_email) { user }
        allow(user).to receive(:correct_password?) { false }
        expect(user_repo).not_to receive(:regenerate_token)
      end

      it 'fails to login' do
        result = subject.run(query: query(email, "badpassword"))
        login = result.dig("data", "login")
        expect(login["error"]).to_not be_nil
      end
    end
  end
end
