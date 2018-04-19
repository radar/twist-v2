require 'spec_helper'

describe Web::GraphQL::Runner do
  context 'login mutation' do
    let(:user_repo) { double }

    subject { described_class.new(user_repo: user_repo) }

    context 'when the credentials are valid' do
      let(:email) { "test@example.com" }
      let(:user) { double(User, id: 1) }

      before do
        allow(user_repo).to receive(:find_by_email) { user }
        allow(user).to receive(:correct_password?) { true }
        allow(user_repo).to receive(:regenerate_token) { "abc1234" }
      end

      it 'logs in successfully' do
        query = %|
          mutation loginMutation {
            login(email: "#{email}", password: "password") {
              token
              error
            }
          }
        |
        result = subject.run(query: query)
        login = result.dig("data", "login")
        expect(login["token"]).to_not be_nil
        expect(login["error"]).to be_nil
      end
    end

    context 'when the user cannot be found' do
      before do
        allow(user_repo).to receive(:find_by_email) { nil }
        expect(user_repo).not_to receive(:regenerate_token)
      end

      it 'fails to login' do
        query = %|
          mutation loginMutation {
            login(email: "me@ryanbigg.com", password: "password") {
              token
              error
            }
          }
        |

        result = subject.run(query: query)
        login = result.dig("data", "login")
        expect(login["token"]).to be_nil
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
        query = %|
          mutation loginMutation {
            login(email: "me@ryanbigg.com", password: "password") {
              token
              error
            }
          }
        |

        result = subject.run(query: query)
        login = result.dig("data", "login")
        expect(login["token"]).to be_nil
        expect(login["error"]).to_not be_nil
      end
    end
  end
end
