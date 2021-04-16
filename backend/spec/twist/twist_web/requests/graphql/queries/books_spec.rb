require "requests_helper"

module Twist
  describe "Books", type: :request do
    let(:create_book) { Twist::Container["transactions.books.create"] }
    let!(:create_user) { Twist::Container["transactions.users.create"] }
    let!(:grant_permission) { Twist::Container["transactions.users.grant_permission"] }
    let!(:book) { create_book.(title: "Rails 4 in Action", default_branch: "master").success }

    let!(:user) do
      create_user.(
        email: "me@ryanbigg.com",
        password: "password",
        name: "Ryan Bigg",
      ).success
    end

    before do
      grant_permission.(user: user, book: book)
    end

    it "gets a list of books" do
      query = <<~QUERY
      {
        books {
          id
          permalink
          title
          defaultBranch {
            name
          }
        }
      }
      QUERY

      query!(query: query, user: user)
      expect(json_body).to eq({
        "data" => {
          "books" => [
            {
              "id" => book.id.to_s,
              "permalink" => book.permalink,
              "title" => book.title,
              "defaultBranch" => {
                "name" => "master"
              }
            }
          ]
        }
      })
    end
  end
end
