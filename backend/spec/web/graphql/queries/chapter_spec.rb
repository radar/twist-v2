require 'spec_helper'

describe Web::GraphQL::Runner do
  context 'chapter' do
    let(:current_user) { double(User, id: 1) }
    let(:book_repo) { double(BookRepository) }
    let(:branch_repo) { double(BranchRepository) }
    let(:commit_repo) { double(CommitRepository) }
    let(:chapter_repo) { double(ChapterRepository) }
    let(:element_repo) { double(ElementRepository) }
    let(:image_repo) { double(ImageRepository) }
    let(:note_repo) { double(NoteRepository) }
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

    let(:previous_chapter) do
      double(
        Chapter,
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
        Chapter,
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
        Chapter,
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
        Element,
        id: 1,
        content: "<h2>In the beginning</h2>",
        tag: "h2",
        notes_count: 1,
        image_id: 1,
      )
    end

    let(:sub_section) do
      double(
        Element,
        id: 3,
        content: "<h3>And then...</h3>",
        tag: "h3",
        notes_count: 1,
        image_id: 1,
      )
    end

    let(:element) do
      double(
        Element,
        id: 2,
        content: "<p>Hello World</p>",
        tag: "p",
        notes_count: 1,
        image_id: 1,
      )
    end

    let(:image) do
      double(
        Image,
        image: double(url: "img.jpg"),
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
          image: image_repo,
          note: note_repo,
        },
      )
    end

    it "fetches chapter data" do
      query = %|
        query chapterQuery($bookPermalink: String!, $chapterPermalink: String!) {
          book(permalink: $bookPermalink) {
            title
            id
            permalink
            defaultBranch {
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
                  image {
                    path
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
      expect(branch_repo).to receive(:by_book) { [branch] }
      expect(commit_repo).to receive(:latest_for_branch) { commit }
      expect(chapter_repo).to receive(:for_commit_and_permalink) { chapter }
      expect(chapter_repo).to receive(:previous_chapter) { previous_chapter }
      expect(chapter_repo).to receive(:next_chapter) { next_chapter }
      expect(element_repo).to receive(:by_chapter) { [element] }
      expect(element_repo).to receive(:sections_for_chapter) { [section, sub_section] }
      expect(image_repo).to receive(:by_ids) { [image] }
      expect(note_repo).to receive(:count) { [0] }

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

      chapter = book.dig("defaultBranch", "chapter")

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
      expect(element["noteCount"]).to eq(0)
      expect(element["image"]["path"]).to eq("img.jpg")
    end
  end
end
