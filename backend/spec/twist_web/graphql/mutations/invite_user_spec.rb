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

      let(:permission) do
        double(Permission, book_id: 1, user_id: 2)
      end

      context "when a permission does not exist" do
        before do
          expect(permission_repo).to receive(:find_by_book_id_and_user_id).with("1", "2") { nil }
          expect(permission_repo).to receive(:create).with(book_id: "1", user_id: "2") { permission }
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


      context "when a permission exists" do
        before do
          expect(permission_repo).to receive(:find_by_book_id_and_user_id).with("1", "2") { permission }
          expect(permission_repo).not_to receive(:create).with(book_id: "1", user_id: "2") { permission }
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
end
