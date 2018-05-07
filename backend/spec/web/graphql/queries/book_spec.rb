require 'spec_helper'

describe Web::GraphQL::Runner do
  context 'book' do
    let(:current_user) { double(User, id: 1) }
    let(:book_repo) { double(BookRepository) }
    let(:branch_repo) { double(BranchRepository) }
    let(:book) do
      double(
        Book,
        id: 1,
        title: "Exploding Rails",
        permalink: "exploding-rails",
      )
    end

    let(:branch) do
      double(
        Branch,
        id: 1,
        name: "master",
        default: true,
      )
    end

    subject do
      described_class.new(
        book_repo: book_repo,
        branch_repo: branch_repo,
      )
    end

    it "fetches the book" do
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

    it "with defaultBranch" do
      query = %|
        query allBooks {
          book(permalink: "exploding-rails") {
            id
            title
            defaultBranch {
              name
            }
          }
        }
      |

      expect(book_repo).to receive(:find_by_permalink) { book }
      expect(branch_repo).to receive(:by_book) { [branch] }

      result = subject.run(
        query: query,
        context: { current_user: current_user },
      )

      book = result.dig("data", "book")
      expect(book["id"]).to eq("1")
      expect(book["title"]).to eq("Exploding Rails")
      branch = book["defaultBranch"]
      expect(branch["name"]).to eq("master")
    end
  end
end
