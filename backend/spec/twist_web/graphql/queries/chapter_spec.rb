require 'spec_helper'

module Twist
  describe Web::GraphQL::Runner, graphql: true do
    context 'chapter' do
      let(:current_user) { double(Entities::User, id: 1) }
      let(:book_repo) { double(Repositories::BookRepo) }
      let(:branch_repo) { double(Repositories::BranchRepo) }
      let(:commit_repo) { double(Repositories::CommitRepo) }
      let(:chapter_repo) { double(Repositories::ChapterRepo) }
      let(:element_repo) { double(Repositories::ElementRepo) }
      let(:footnote_repo) { double(Repositories::FootnoteRepo) }
      let(:image_repo) { double(Repositories::ImageRepo) }
      let(:note_repo) { double(Repositories::NoteRepo) }
      let(:book_note_repo) { double(Repositories::BookNoteRepo) }
      let(:user_repo) { double(Repositories::UserRepo) }
      let(:permission_repo) { double(Repositories::PermissionRepo) }

      let(:book) do
        exploding_rails
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
          id: 1,
        )
      end

      let(:previous_chapter) do
        double(
          Entities::Chapter,
          id: 1,
          title: "Preface",
          permalink: "preface",
          position: 1,
          part: "frontmatter",
          commit_id: 1,
        )
      end

      let(:chapter) do
        double(
          Entities::Chapter,
          id: 2,
          title: "Introduction",
          permalink: "introduction",
          position: 2,
          part: "frontmatter",
          commit_id: 1,
        )
      end

      let(:next_chapter) do
        double(
          Entities::Chapter,
          id: 3,
          title: "Getting Started",
          permalink: "getting-started",
          position: 1,
          part: "mainmatter",
          commit_id: 1,
        )
      end

      let(:section) do
        double(
          Entities::Element,
          id: 1,
          content: "<h2>In the beginning</h2>",
          tag: "h2",
          notes_count: 1,
          image_id: 1,
        )
      end

      let(:sub_section) do
        double(
          Entities::Element,
          id: 3,
          content: "<h3>And then...</h3>",
          tag: "h3",
          notes_count: 1,
          image_id: 1,
        )
      end

      let(:element) do
        double(
          Entities::Element,
          id: 2,
          content: "<p>Hello World</p>",
          identifier: "hello-world",
          tag: "p",
          notes_count: 1,
          image_id: 1,
        )
      end

      let(:footnote) do
        double(
          Entities::Footnote,
          number: "1",
          identifier: "_footnotedef_1",
        )
      end

      let(:image) do
        double(
          Entities::Image,
          image: double(url: "img.jpg"),
          status: 'completed',
        )
      end

      let(:other_user) do
        double(
          Entities::User,
          id: 2,
          email: "other@example.com",
          name: "Other User"
        )
      end

      let(:note) do
        double(
          Entities::Note,
          id: 1,
          number: 1,
          created_at: Time.now,
          state: "open",
          text: "A simple note",
          user_id: other_user.id,
        )
      end

      subject do
        described_class.new(
          repos: {
            book: book_repo,
            branch: branch_repo,
            chapter: chapter_repo,
            commit: commit_repo,
            element: element_repo,
            footnote: footnote_repo,
            image: image_repo,
            note: note_repo,
            book_note: book_note_repo,
            user: user_repo,
            permission: permission_repo,
          },
        )
      end

      before do
        allow(permission_repo).to receive(:user_authorized_for_book?) { true }
      end

      it "fetches chapter data -- no commit specified" do
        query = %|
          query chapterQuery($bookPermalink: String!, $chapterPermalink: String!, $commitSHA: String) {
            book(permalink: $bookPermalink) {
              ... on PermissionDenied {
                error
              }
              ... on Book {
                title
                id
                permalink
                commit(gitRef: $commitSHA) {
                  id
                  chapter(permalink: $chapterPermalink) {
                    ...chapterFragment
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
                      notes(state: OPEN) {
                        id
                        number
                        createdAt
                        state
                        text
                        user {
                          name
                          email
                        }
                      }
                      identifier
                      image {
                        path
                      }
                    }

                    footnotes {
                      number
                      identifier
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
          }

          fragment chapterFragment on Chapter {
            id
            title
            position
            part
            permalink
          }
        |

        expect(book_repo).to receive(:find_by_permalink) { book }
        expect(commit_repo).to receive(:latest_for_default_branch) { commit }
        expect(chapter_repo).to receive(:for_commit_and_permalink) { chapter }
        expect(chapter_repo).to receive(:previous_chapter) { previous_chapter }
        expect(chapter_repo).to receive(:next_chapter) { next_chapter }
        expect(element_repo).to receive(:by_chapter) { [element] }
        expect(footnote_repo).to receive(:by_chapter_and_commit) { [footnote] }
        expect(element_repo).to receive(:sections_for_chapter) { [section, sub_section] }
        expect(image_repo).to receive(:by_ids) { [image] }
        expect(note_repo).to receive(:count) { [1] }
        expect(book_note_repo).to receive(:by_element_and_state) { [note] }
        expect(user_repo).to receive(:by_ids) { [other_user] }

        result = subject.run(
          query: query,
          variables: {
            bookPermalink: "exploding-rails",
            chapterPermalink: "introduction",
          },
          context: { current_user: current_user },
        )

        book = result.dig("data", "book")
        expect(book["id"]).to eq("1")
        expect(book["title"]).to eq("Exploding Rails")

        chapter = book.dig("commit", "chapter")

        expect(chapter["id"]).to eq("2")
        expect(chapter["title"]).to eq("Introduction")
        expect(chapter["position"]).to eq(2)
        expect(chapter["permalink"]).to eq("introduction")
        expect(chapter["part"]).to eq("frontmatter")

        sections = chapter["sections"]

        section = sections.first
        expect(section["id"]).to eq("1")
        expect(section["title"]).to eq("In the beginning")
        expect(section["link"]).to eq("in-the-beginning")

        subsection = section["subsections"].first
        expect(subsection["id"]).to eq("3")
        expect(subsection["title"]).to eq("And then...")
        expect(subsection["link"]).to eq("and-then")

        previous_chapter = chapter["previousChapter"]
        expect(previous_chapter["id"]).to eq("1")
        expect(previous_chapter["title"]).to eq("Preface")
        expect(previous_chapter["position"]).to eq(1)
        expect(previous_chapter["permalink"]).to eq("preface")
        expect(previous_chapter["part"]).to eq("frontmatter")

        next_chapter = chapter["nextChapter"]
        expect(next_chapter["id"]).to eq("3")
        expect(next_chapter["title"]).to eq("Getting Started")
        expect(next_chapter["position"]).to eq(1)
        expect(next_chapter["permalink"]).to eq("getting-started")
        expect(next_chapter["part"]).to eq("mainmatter")

        elements = chapter["elements"]
        expect(elements.count).to eq(1)

        element = elements.first
        expect(element["id"]).to eq("2")
        expect(element["tag"]).to eq("p")
        expect(element["content"]).to eq("<p>Hello World</p>")
        expect(element["identifier"]).to eq("hello-world")
        expect(element["noteCount"]).to eq(1)
        expect(element["image"]["path"]).to eq("img.jpg")

        note = element["notes"].first
        expect(note["id"]).to eq("1")
        expect(note["number"]).to eq(1)
        expect(note["user"]).to eq(
          "name" => "Other User",
          "email" => "other@example.com",
        )
        expect(note["state"]).to eq("open")
        expect(note["createdAt"]).to_not be_nil
        expect(note["text"]).to eq("A simple note")

        footnotes = chapter["footnotes"]
        expect(footnotes.count).to eq(1)

        footnote = footnotes.first
        expect(footnote["identifier"]).to eq("_footnotedef_1")
        expect(footnote["number"]).to eq(1)
      end
    end
  end
end
