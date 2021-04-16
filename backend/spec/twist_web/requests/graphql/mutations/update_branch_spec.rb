require "requests_helper"

module Twist
  describe "Update branch", type: :request do
    let!(:create_user) { Twist::Container["transactions.users.create"] }
    let(:create_book) { Twist::Container["transactions.books.create"] }
    let(:find_or_create_branch) { Twist::Container["transactions.branches.find_or_create"] }
    let!(:make_author) { Twist::Container["transactions.permissions.make_author"] }

    let!(:book) { create_book.(title: "Markdown Book Test", default_branch: "master", format: "markdown", github_user: "radar", github_repo: "markdown_book_test").success }
    let!(:branch) { find_or_create_branch.(book_id: book.id, ref: "master") }

    let!(:radar) do
      create_user.(
        email: "me@ryanbigg.com",
        password: "password",
        name: "Ryan Bigg",
        github_login: "radar",
      ).success
    end

    let(:query) do
      %|
        mutation UpdateBranch($bookPermalink: String!, $branchName: String!) {
          updateBranch(bookPermalink: $bookPermalink, branchName: $branchName) {
            name
          }
        }
      |
    end

    let(:variables) do
      {
        bookPermalink: book.permalink,
        branchName: branch.name,
      }
    end

    let(:permission_record) do
      permission_repo.find_by_book_id_and_user_id(book_id: book.id, user_id: ghost.id)
    end

    context "when the updater is not an author" do
      it "does not update the branch" do
        query!(query: query, variables: variables, user: radar)

        update_branch = json_body.dig("data", "updateBranch")
        expect(update_branch["error"]).to eq("You must be an author to do that.")
      end
    end

    context "when the updater is an author" do
      before do
        make_author.(book_id: book.id, user_id: radar.id)
      end

      it "updates the branch" do
        query!(query: query, variables: variables, user: radar)

        update_branch = json_body.dig("data", "updateBranch")
        expect(update_branch["name"]).to eq("master")
      end
    end
  end
end
