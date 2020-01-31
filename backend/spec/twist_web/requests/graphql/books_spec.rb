require "requests_helper"

module Twist
  describe "Books", type: :request do
    let(:create_book) { Twist::Container["transactions.books.create"] }
    let!(:book) { create_book.(title: "Rails 4 in Action", default_branch: "master").success }

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

      post "/graphql", query: query
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
