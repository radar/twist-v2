require "spec_helper"

describe MarkdownBookWorker do
  let(:book_repo) { BookRepository.new }
  let(:branch_repo) { BranchRepository.new }
  let(:chapter_repo) { ChapterRepository.new }

  context "perform" do
    context "with markdown_book_test" do
      let!(:book) { book_repo.create(permalink: "markdown_book_test") }
      let!(:branch) { book_repo.add_branch(book, name: "master") }

      it "processes a test Markdown book" do
        subject.perform(
          permalink: book.permalink,
          branch: branch.name,
          github_path: "radar/markdown_book_test",
        )

        chapters = chapter_repo.for_branch(branch.id).to_a

        expect(chapters.count).to eq(4)

        intro = chapters[0]
        expect(intro.file_name).to eq("introduction.markdown")
        expect(intro.permalink).to eq("introduction")
        expect(intro.position).to eq(1)
        expect(intro.part).to eq("frontmatter")

        chapter_1 = chapters[1]
        expect(chapter_1.file_name).to eq("chapter_1/chapter_1.markdown")
        expect(chapter_1.permalink).to eq("in-the-beginning")
        expect(chapter_1.position).to eq(1)
        expect(chapter_1.part).to eq("mainmatter")

        chapter_2 = chapters[2]
        expect(chapter_2.file_name).to eq("chapter_2/chapter_2.markdown")
        expect(chapter_2.permalink).to eq("another-chapter")
        expect(chapter_2.position).to eq(2)
        expect(chapter_2.part).to eq("mainmatter")

        appendix = chapters[3]
        expect(appendix.file_name).to eq("appendix.markdown")
        expect(appendix.permalink).to eq("appendix")
        expect(appendix.position).to eq(1)
        expect(appendix.part).to eq("backmatter")
      end
    end
  end

  context "saas_book", integration: true do
    let(:book) do
      book_repo.create(permalink: "saas_book")
    end

    let!(:branch) { book_repo.add_branch(book, name: "master") }

    it "can process the book" do
      subject.perform(
        permalink: book.permalink,
        branch: branch.name,
        github_path: "rubysherpas/saas_book",
      )

      chapters = chapter_repo.for_branch(branch.id)

      expect(chapters.count).to eq(7)
    end
  end
end
