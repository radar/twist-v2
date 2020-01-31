require 'spec_helper'

module Twist
  describe Web::GraphQL::Runner do
    context 'books' do
      let(:current_user) { double(User, id: 1) }
      let(:book_repo) { double(Repositories::BookRepo) }
      let(:book) do
        double(
          Book,
          id: 1,
          title: "Exploding Rails",
          permalink: "exploding-rails",
        )
      end

      subject { described_class.new(repos: { book: book_repo }) }

      it "fetches all the books" do
        query = %|
          query allBooks {
            books {
              id
              title
              permalink
            }
          }
        |

        expect(book_repo).to receive(:all) { [book] }

        result = subject.run(
          query: query,
          context: { current_user: current_user },
        )

        books = result.dig("data", "books")
        expect(books.count).to eq(1)

        book = books.first
        expect(book["id"]).to eq("1")
        expect(book["title"]).to eq("Exploding Rails")
        expect(book["permalink"]).to eq("exploding-rails")
      end
    end
  end
end
