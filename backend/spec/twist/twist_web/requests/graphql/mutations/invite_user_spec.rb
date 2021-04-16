require "requests_helper"

module Twist
  describe "Invite User", type: :request do
    let!(:create_user) { Twist::Container["transactions.users.create"] }
    let(:create_book) { Twist::Container["transactions.books.create"] }
    let!(:make_author) { Twist::Container["transactions.permissions.make_author"] }
    let!(:invite) { Twist::Container["transactions.invitations.invite"] }
    let!(:permission_repo) { Twist::Container["repositories.permission_repo"] }

    let!(:book) { create_book.(title: "Active Rails", default_branch: "master").success }

    let!(:radar) do
      create_user.(
        email: "me@ryanbigg.com",
        password: "password",
        name: "Ryan Bigg",
        github_login: "radar",
      ).success
    end


    let!(:ghost) do
      create_user.(
        email: "other@example.com",
        password: "password",
        name: "Other User",
        github_login: "ghost",
      ).success
    end

    let(:query) do
      %|
        mutation inviteUser($bookId: ID!, $userId: ID!) {
          inviteUser(bookId: $bookId, userId: $userId) {
            bookId
            userId
            error
          }
        }
      |
    end

    let(:permission_record) do
      permission_repo.find_by_book_id_and_user_id(book_id: book.id, user_id: ghost.id)
    end

    context "when the inviter is not an author" do
      context "when the invitee is not already invited" do
        it "does not invite a user" do
          variables = {
            bookId: book.id,
            userId: ghost.id,
          }

          query!(query: query, variables: variables, user: radar)

          invite_user = json_body.dig("data", "inviteUser")
          expect(invite_user["error"]).to eq("You must be an author to do that.")

          expect(permission_record).to be_nil
        end
      end
    end

    context "when the inviter is an author" do
      before do
        make_author.(book_id: book.id, user_id: radar.id)
      end

      context "when the invitee is not already invited" do
        it "invites a user" do
          variables = {
            bookId: book.id,
            userId: ghost.id,
          }

          query!(query: query, variables: variables, user: radar)

          invite_user = json_body.dig("data", "inviteUser")

          expect(invite_user["bookId"]).to eq(book.id.to_s)
          expect(invite_user["userId"]).to eq(ghost.id.to_s)

          expect(permission_record).not_to be_nil
        end
      end

      context "when the invitee is already invited" do
        before do
          invite.(inviter: radar, book_id: book.id, user_id: ghost.id).success
        end

        it "does nothing at all" do
          variables = {
            bookId: book.id,
            userId: ghost.id,
          }

          query!(query: query, variables: variables, user: radar)

          invite_user = json_body.dig("data", "inviteUser")


          expect(invite_user["bookId"]).to eq(book.id.to_s)
          expect(invite_user["userId"]).to eq(ghost.id.to_s)

          expect(permission_record).not_to be_nil
        end
      end
    end
  end
end
