require "requests_helper"

module Twist
  describe "book -> readers", type: :request do
    let!(:create_book) { Twist::Container["transactions.books.create"] }
    let!(:create_user) { Twist::Container["transactions.users.create"] }
    let!(:permission_repo) { Twist::Container["repositories.permission_repo"] }

    let!(:book) { create_book.(title: "Active Rails", default_branch: "master").success }

    let!(:radar) do
      create_user.(
        email: "me@ryanbigg.com",
        password: "password",
        name: "Ryan Bigg",
        github_login: "radar"
      ).success
    end

    let!(:twist) do
      create_user.(
        email: "twist@ryanbigg.com",
        password: "password",
        name: "Twist Books",
        github_login: "twist-books"
      ).success
    end

    before do
      permission_repo.create(book_id: book.id, user_id: radar.id)
    end

    let(:query) do
      %|
        query readers($permalink: String!) {
          book(permalink: $permalink) {
            ... on PermissionDenied {
              error
            }

            ... on Book {
              readers {
                githubLogin
                name
              }
            }
          }
        }
      |
    end

    it "finds all users matching login" do
      variables = {
        permalink: book.permalink,
      }

      query!(query: query, variables: variables, user: radar)

      readers = json_body.dig("data", "book", "readers")

      expect(readers.count).to eq(1)
      expect(readers.first["githubLogin"]).to eq(radar.github_login)
      expect(readers.first["name"]).to eq(radar.name)
    end
  end
end
