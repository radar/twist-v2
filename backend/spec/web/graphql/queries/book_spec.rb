require 'spec_helper'

describe Web::GraphQL::Runner do
  context 'book' do
    let(:current_user) { double(User, id: 1) }
    let(:book_repo) { double(BookRepository) }
    let(:branch_repo) { double(BranchRepository) }
    let(:commit_repo) { double(CommitRepository) }
    let(:chapter_repo) { double(ChapterRepository) }
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

    let(:commit) do
      double(
        Commit,
        id: 1,
      )
    end

    let(:chapter) do
      double(
        Chapter,
        id: 1,
        title: "Introduction",
        permalink: "introduction",
        position: 1,
      )
    end

    subject do
      described_class.new(
        repos: {
          book: book_repo,
          branch: branch_repo,
          chapter: chapter_repo,
          commit: commit_repo
        }
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

    it "with defaultBranch and chapters" do
      query = %|
        query allBooks {
          book(permalink: "exploding-rails") {
            id
            title
            defaultBranch {
              name
              chapters(part: FRONTMATTER) {
                ...chapterFields
              }
            }
          }
        }

        fragment chapterFields on Chapter {
          id
          title
          position
          permalink
        }
      |

      expect(book_repo).to receive(:find_by_permalink) { book }
      expect(branch_repo).to receive(:by_book) { [branch] }
      expect(commit_repo).to receive(:latest_for_branch) { commit }
      expect(chapter_repo).to receive(:for_commit_and_part) { [chapter] }

      result = subject.run(
        query: query,
        context: { current_user: current_user },
      )

      book = result.dig("data", "book")
      expect(book["id"]).to eq("1")
      expect(book["title"]).to eq("Exploding Rails")
      branch = book["defaultBranch"]
      expect(branch["name"]).to eq("master")

      chapters = branch["chapters"]
      expect(chapters.count).to eq(1)

      chapter = chapters.first
      expect(chapter["id"]).to eq("1")
      expect(chapter["title"]).to eq("Introduction")
      expect(chapter["position"]).to eq(1)
      expect(chapter["permalink"]).to eq("introduction")
    end
  end
end
