require "requests_helper"

module Twist
  describe "Invite User", type: :request do
    let!(:create_user) { Twist::Container["transactions.users.create"] }
    let(:create_book) { Twist::Container["transactions.books.create"] }

    let!(:book) { create_book.(title: "Active Rails", default_branch: "master").success }

    let!(:radar) do
      create_user.(
        email: "me@ryanbigg.com",
        password: "password",
        name: "Ryan Bigg",
        github_login: "radar"
      ).success
    end


    let!(:ghost) do
      create_user.(
        email: "other@example.com",
        password: "password",
        name: "Other User",
        github_login: "ghost"
      ).success
    end

    let(:query) do
      %|
        mutation inviteUser($bookId: ID!, $userId: ID!) {
          inviteUser(bookId: $bookId, userId: $userId) {
            bookId
            userId
          }
        }
      |
    end

    context "when the user is not already invited" do
      it "invites a user" do
        variables = {
          bookId: book.id,
          userId: ghost.id,
        }

        query!(query: query, variables: variables, user: radar)

        invite_user = json_body.dig("data", "inviteUser")

        expect(invite_user["bookId"]).to eq(book.id.to_s)
        expect(invite_user["userId"]).to eq(ghost.id.to_s)
      end
    end

    context "when the user is already invited" do
      let(:invite_user) { Twist::Container["transactions.invitations.invite"] }
      before do
        invite_user.(book_id: book.id, user_id: ghost.id).success
      end

      it "shows an error" do
        variables = {
          bookId: book.id,
          userId: ghost.id,
        }

        query!(query: query, variables: variables, user: radar)

        invite_user = json_body.dig("data", "inviteUser")

        expect(invite_user["bookId"]).to eq(book.id.to_s)
        expect(invite_user["userId"]).to eq(ghost.id.to_s)
      end
    end
  end
end
