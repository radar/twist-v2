require 'spec_helper'

module Twist
  describe Web::GraphQL::Runner, graphql: true do
    context 'book' do
      let(:current_user) { double(Entities::User, id: 1) }
      let(:book_repo) { double(Repositories::BookRepo) }
      let(:branch_repo) { double(Repositories::BranchRepo) }
      let(:commit_repo) { double(Repositories::CommitRepo) }
      let(:chapter_repo) { double(Repositories::ChapterRepo) }
      let(:permission_repo) { double(Repositories::PermissionRepo) }
      let(:book) do
        Twist::Entities::Book.new(
          id: 1,
          title: "Exploding Rails",
          permalink: "exploding-rails",
        )
      end

      let(:branch) do
        double(
          Entities::Branch,
          id: 1,
          name: "master",
          default: true,
        )
      end

      let(:commit) do
        double(
          Entities::Commit,
          sha: "abc123",
          id: 1,
          created_at: Time.now,
          branch_id: branch.id,
        )
      end

      let(:chapter) do
        double(
          Entities::Chapter,
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
            commit: commit_repo,
            permission: permission_repo,
          },
        )
      end

      let(:context) do
        { current_user: current_user }
      end

      context "when the user has permission to access the book" do
        before do
          allow(permission_repo).to receive(:user_authorized_for_book?) { true }
        end

        it "with defaultBranch and chapters" do
          query = %|
            query {
              book(permalink: "exploding-rails") {
                ... on Book {
                  id
                  title
                  defaultBranch {
                    name
                    chapters(part: FRONTMATTER) {
                      ...chapterFields
                    }
                  }
                }

                ... on PermissionDenied {
                  error
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

        context "with currentUserAuthor" do
          let(:query) do
            %|
              query {
                book(permalink: "exploding-rails") {
                  ... on Book {
                    currentUserAuthor
                  }
                }
              }
            |
          end
          let(:variables) { }

          before do
            expect(book_repo).to receive(:find_by_permalink) { book }
            expect(permission_repo).to receive(:author?) { true }
          end

          it "shows that the current user is the author" do
            result = run_query!
            book = result.dig("data", "book")
            expect(book["currentUserAuthor"]).to eq(true)
          end
        end

        it "latest commit for a branch (using ref)" do
          query = %|
            query bookQuery($permalink: String!, $gitRef: String) {
              book(permalink: $permalink) {
                ... on PermissionDenied {
                  error
                }

                ... on Book {
                  title
                  id
                  permalink
                  latestCommit(gitRef: $gitRef) {
                    sha
                  }
                  commit(gitRef: $gitRef) {
                    id
                    sha
                    createdAt
                    branch {
                      name
                    }
                    frontmatter: chapters(part: FRONTMATTER) {
                      ...chapterFields
                    }
                    mainmatter: chapters(part: MAINMATTER) {
                      ...chapterFields
                    }
                    backmatter: chapters(part: BACKMATTER) {
                      ...chapterFields
                    }
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
          expect(branch_repo).to receive(:by_ids) { [branch] }
          expect(commit_repo).to receive(:latest_for_book_and_ref).twice { commit }
          expect(commit_repo).to receive(:by_book_and_sha) { nil }
          expect(chapter_repo).to receive(:for_commit_and_part).at_least(3).times { [chapter] }

          result = subject.run(
            query: query,
            variables: {
              permalink: "exploding-rails",
              gitRef: "master",
            },
            context: { current_user: current_user },
          )

          book = result.dig("data", "book")
          expect(book["id"]).to eq("1")
          expect(book["title"]).to eq("Exploding Rails")
          commit = book["commit"]
          expect(commit["sha"]).to eq("abc123")

          frontmatter_chapters = commit["frontmatter"]
          expect(frontmatter_chapters.count).to eq(1)

          chapter = frontmatter_chapters.first
          expect(chapter["id"]).to eq("1")
          expect(chapter["title"]).to eq("Introduction")
          expect(chapter["position"]).to eq(1)
          expect(chapter["permalink"]).to eq("introduction")
        end
      end

      context "when the user does not have permission to access the book" do
        before do
          allow(permission_repo).to receive(:user_authorized_for_book?) { false }
        end

        it "shows a permission denied error" do
          query = %|
            query {
              book(permalink: "exploding-rails") {
                ... on PermissionDenied {
                  error
                }
              }
            }
          |

          expect(book_repo).to receive(:find_by_permalink) { book }
          expect(branch_repo).not_to receive(:by_book) { [branch] }
          expect(commit_repo).not_to receive(:latest_for_branch) { commit }
          expect(chapter_repo).not_to receive(:for_commit_and_part) { [chapter] }

          result = subject.run(
            query: query,
            context: { current_user: current_user },
          )

          book = result.dig("data", "book")
          expect(book["error"]).not_to be_nil
        end
      end
    end
  end
end
