require 'spec_helper'

describe Web::GraphQL::Runner do
  context 'books query' do
    let(:book_repo) { double(BookRepository) }
    let(:book) do
      double(
        Book,
        id: 1,
        title: "Exploding Rails",
        permalink: "exploding-rails",
      )
    end

    subject { described_class.new(repos: { book: book_repo }) }

    let(:query) do
      %|
        query {
          books {
            id
            title
            permalink
          }
        }
      |
    end

    let(:result) do
      subject.run(
        query: query,
        context: { current_user: current_user },
      )
      end

    context 'when current user is not set' do
      let(:current_user) { nil }

      it 'returns an unauthorized error' do
        expect(book_repo).not_to receive(:all)

        expect(result["success"]).to eq(false)
        expect(result["error"]).to eq("You must be authenticated before using this API.")
      end
    end

    context 'when current user is set' do
      let(:current_user) { double(User, id: 1) }

      it "fetches all the books" do
        expect(book_repo).to receive(:all) { [book] }

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
