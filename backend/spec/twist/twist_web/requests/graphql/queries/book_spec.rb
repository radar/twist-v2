require "requests_helper"

module Twist
  describe "Books", type: :request do
    let(:create_book) { Twist::Container["transactions.books.create"] }
    let!(:book) { create_book.(title: "Markdown Book Test", default_branch: "master").success }
    let!(:create_user) { Twist::Container["transactions.users.create"] }
    let!(:generate_jwt) { Twist::Container["transactions.users.generate_jwt"] }
    let!(:grant_permission) { Twist::Container["transactions.users.grant_permission"] }
    let!(:make_author) { Twist::Container["transactions.permissions.make_author"] }
    let!(:submit_note) { Twist::Container["transactions.notes.submit"] }

    before do
      Markdown::BookWorker.new.perform(
        "permalink" => "markdown-book-test",
        "branch" => "master",
        "github_path" => "radar/markdown_book_test",
      )
    end

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

    let!(:element_repo) { Twist::Container["repositories.element_repo"]  }
    let!(:element) { element_repo.elements.first }

    let!(:note) do
      submit_note.(
        book_permalink: book.permalink,
        user_id: user.id,
        element_id: element.id,
        text: "This is a note",
      ).success
    end

    context "currentUserAuthor" do
      let(:book_query) do
        <<~QUERY
          query bookQuery($permalink: String!) {
            book(permalink: $permalink) {
              ... on Book {
                currentUserAuthor
              }
            }
          }
        QUERY
      end

      let(:variables) do
        {
          permalink: "markdown-book-test",
        }
      end

      let(:current_user_author) do
        json_body
          .dig(
            "data",
            "book",
            "currentUserAuthor",
          )
      end

      context "when the user is an author of the book" do
        before do
          make_author.(book_id: book.id, user_id: user.id)
        end

        it "returns true" do
          query!(query: book_query, variables: variables, user: user)
          expect(current_user_author).to eq(true)
        end
      end

      context "when the user is not an author of the book" do
        it "returns false" do
          query!(query: book_query, variables: variables, user: user)
          expect(current_user_author).to eq(false)
        end
      end
    end

    context "all chapters" do
      let(:book_query) do
        <<~QUERY
          query bookQuery($permalink: String!, $commitSHA: String) {
            book(permalink: $permalink) {
              ... on Book {
                title
                id
                permalink
                commit(gitRef: $commitSHA) {
                  id
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
        QUERY
      end

      it "gets all of a book's chapters" do
        variables = {
          permalink: "markdown-book-test",
        }

        query!(query: book_query, variables: variables, user: user)

        chapter = json_body
          .dig(
            "data",
            "book",
            "commit",
            "frontmatter",
          )
          .first

        expect(chapter["permalink"]).to eq("introduction")
      end

      it "gets all of a book's chapters at a particular commit" do
        commit_repo = Twist::Container["repositories.commit_repo"]
        commit = commit_repo.latest_for_default_branch(book.id)
        variables = {
          permalink: "markdown-book-test",
          commitSHA: commit.sha[0..8],
        }

        query!(query: book_query, variables: variables, user: user)

        chapter = json_body
          .dig(
            "data",
            "book",
            "commit",
            "frontmatter",
          )
          .first


        expect(chapter["permalink"]).to eq("introduction")
      end
    end

    context "a particular chapter" do
      let(:chapter_query) do
        <<~QUERY
          query chapterQuery($bookPermalink: String!, $chapterPermalink: String!, $commitSHA: String) {
            book(permalink: $bookPermalink) {
              ... on Book {
                title
                id
                permalink
                commit(gitRef: $commitSHA) {
                  id
                  chapter(permalink: $chapterPermalink) {
                    id
                    title
                    position
                    permalink
                    part
                    sections {
                      ...sectionFragment
                      subsections {
                        ...sectionFragment
                      }
                    }
                    previousChapter {
                      ...chapterFragment
                    }
                    nextChapter {
                      ...chapterFragment
                    }
                    elements {
                      id
                      content
                      tag
                      noteCount
                      image {
                        path
                      }
                    }
                  }
                }
              }
            }
          }

          fragment sectionFragment on Section {
            id
            title
            link
            __typename
          }

          fragment chapterFragment on Chapter {
            id
            title
            position
            part
            permalink
            __typename
          }
        QUERY
      end

      it "gets a book, chapter and notes" do
        variables = {
          bookPermalink: "markdown-book-test",
          chapterPermalink: "introduction",
        }

        query!(query: chapter_query, variables: variables, user: user)

        element = json_body
          .dig(
            "data",
            "book",
            "commit",
            "chapter",
            "elements",
          )
          .first

        expect(element["noteCount"]).to eq(1)
      end

      it "gets a book, chapter and notes within a commit, for a short commit" do
        commit_repo = Twist::Container["repositories.commit_repo"]
        commit = commit_repo.latest_for_default_branch(book.id)
        variables = {
          bookPermalink: "markdown-book-test",
          chapterPermalink: "introduction",
          commitSHA: commit.sha[0..8],
        }

        query!(query: chapter_query, variables: variables, user: user)

        element = json_body
          .dig(
            "data",
            "book",
            "commit",
            "chapter",
            "elements",
          )
          .first

        expect(element["noteCount"]).to eq(1)
      end
    end
  end
end
