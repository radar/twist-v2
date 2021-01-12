require 'spec_helper'

module Twist
  describe Web::GraphQL::Runner do
    context 'inviteUser mutation' do
      let(:current_user) { double(User, id: 1) }
      let(:permission_repo) { instance_double(Repositories::PermissionRepo) }

      subject do
        described_class.new(
          repos: {
            permission: permission_repo,
          },
        )
      end

      it "invites a user" do
        query = %|
          mutation inviteUser($bookId: ID!, $userId: ID!) {
            inviteUser(bookId: $bookId, userId: $userId) {
              bookId
              userId
            }
          }
        |

        expect(permission_repo).to receive(:create).with(book_id: "1", user_id: "2") do
          double(Permission, book_id: 1, user_id: 2)
        end

        result = subject.run(
          query: query,
          variables: { bookId: 1, userId: 2 },
          context: { current_user: current_user },
        )

        invitation = result.dig("data", "inviteUser")
        expect(invitation["bookId"]).to eq("1")
        expect(invitation["userId"]).to eq("2")
      end
    end
  end
end
