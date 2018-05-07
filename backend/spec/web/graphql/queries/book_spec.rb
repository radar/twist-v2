require 'spec_helper'

describe Web::GraphQL::Runner do
  context 'book' do
    let(:current_user) { double(User, id: 1) }
    let(:book_repo) { double(BookRepository) }
		let(:book) do
			double(
 			  Book,
				id: 1,
			  title: "Exploding Rails",
 			  permalink: "exploding-rails",
			)
    end

    subject { described_class.new(book_repo: book_repo) }

    it "fetches all the books" do
      query = %|
        query allBooks {
          book(permalink: "exploding-rails") {
            id
						title
          }
        }
      |

			expect(book_repo).to receive(:find_by_permalink) { book }

      result = subject.run(
        query: query,
        context: { current_user: current_user },
      )

      book = result.dig("data", "book")
			expect(book["id"]).to eq("1")
			expect(book["title"]).to eq("Exploding Rails")
		end
  end
end
