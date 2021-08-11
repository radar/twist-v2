require 'spec_helper'

module Twist
  describe Web::GraphQL::Runner do
    context 'current_user' do
      let(:current_user) { double(Entities::User, id: 1) }
      let(:user_repository) { double(Repositories::UserRepo) }

      subject do
        described_class.new(
          repos: {
            user: user_repository,
          },
        )
      end

      it "fetches the current user's information" do
        query = %|
          query currentUser {
            currentUser {
              id
            }
          }
        |

        result = subject.run(
          query: query,
          context: {
            current_user: current_user,
          },
        )

        user = result.dig("data", "currentUser")
        expect(user["id"]).to eq("1")
      end
    end
  end
end
