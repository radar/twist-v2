require "requests_helper"

module Twist
  describe "Books", type: :request do
    let(:create_book) { Twist::Container["transactions.books.create"] }
    let!(:book) { create_book.(title: "Markdown Book Test", default_branch: "master").success }
    let!(:create_user) { Twist::Container["transactions.users.create"] }
    let!(:submit_note) { Twist::Container["transactions.notes.submit"] }

    before do
      MarkdownBookWorker.new.perform(
        "permalink" => "markdown-book-test",
        "branch" => "master",
        "github_path" => "radar/markdown_book_test"
      )
    end

    let!(:user) do
      create_user.(
        email: "me@ryanbigg.com",
        password: "password",
        name: "Ryan Bigg"
      ).success
    end

    let!(:element_repo) { Twist::Container["repositories.element_repo"]  }
    let!(:element) { element_repo.elements.first }

    let!(:note) do
      submit_note.(
        book_id: book.id,
        user_id: user.id,
        element_id: element.id,
        text: "This is a note"
      ).success
    end

    it "gets a book, chapter and notes" do
      query = <<~QUERY
      query chapterQuery($bookPermalink: String!, $chapterPermalink: String!) {
        book(permalink: $bookPermalink) {
          title
          id
          permalink
          defaultBranch {
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
                  __typename
                }
                __typename
              }
              previousChapter {
                ...chapterFragment
                __typename
              }
              nextChapter {
                ...chapterFragment
                __typename
              }
              elements {
                id
                content
                tag
                noteCount
                image {
                  path
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
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

      variables = {
        bookPermalink: "markdown-book-test",
        chapterPermalink: "introduction",
      }

      post "/graphql", query: query, variables: variables
      element = json_body
        .dig(
          "data",
          "book",
          "defaultBranch",
          "chapter",
          "elements"
        )
        .first

      expect(element["noteCount"]).to eq(1)
    end
  end
end
