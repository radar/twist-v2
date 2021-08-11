require 'spec_helper'

module Twist
  describe Web::GraphQL::Runner do
    context 'removeReader mutation', graphql: true do
      let(:current_user) { double(Entities::User, id: 1) }
      let(:permission_repo) { instance_double(Repositories::PermissionRepo) }

      subject do
        described_class.new(
          repos: {
            permission: permission_repo,
          },
        )
      end

      let(:query) do
        %|
          mutation removeReader($bookId: ID!, $userId: ID!) {
            removeReader(bookId: $bookId, userId: $userId) {
              bookId
              userId
            }
          }
        |
      end

      let(:variables) do
        { bookId: 1, userId: 2 }
      end

      let(:context) do
        { current_user: current_user }
      end

      before do
        expect(permission_repo).to receive(:author?) { true }
        expect(permission_repo).to receive(:remove).with(book_id: "1", user_id: "2")
      end

      it "removes a reader" do
        result = run_query!

        invitation = result.dig("data", "removeReader")
        expect(invitation["bookId"]).to eq("1")
        expect(invitation["userId"]).to eq("2")
      end
    end
  end
end
