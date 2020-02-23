require "spec_helper"

module Twist
  module Markdown
    describe ChapterProcessor do
      let(:book_repo) { Repositories::BookRepo.new }
      let(:branch_repo) { Repositories::BranchRepo.new }
      let(:element_repo) { Repositories::ElementRepo.new }
      let(:image_repo) { Repositories::ImageRepo.new }
      let(:commit_repo) { Repositories::CommitRepo.new }

      let!(:book) { book_repo.create(permalink: "markdown_book_test") }
      let!(:branch) { branch_repo.create(book_id: book.id, name: "master") }
      let!(:commit) { commit_repo.create(branch_id: branch.id, sha: "abc123") }
      let!(:git) do
        Git.new(
          username: "radar",
          repo: "markdown_book_test",
        )
      end

      before do
        git.fetch!
      end

      subject do
        described_class.new(
          commit,
          git.local_path,
          "chapter_1/chapter_1.markdown",
          "mainmatter",
          1,
        )
      end

      it "can process a chapter" do
        chapter = subject.process
        expect(chapter.title).to eq("In the beginning")
        elements = element_repo.by_chapter(chapter.id).to_a
        expect(elements.first.tag).to eq("p")

        sections = elements.select { |e| e.tag == "h2" }
        sections.map! { |s| Nokogiri::HTML(s.content).text }
        expect(sections).to eq(["This is a new section"])

        images = image_repo.by_chapter(chapter.id).to_a

        expect(images.count).to eq(1)
        expect(images.first.filename).to eq("images/chapter_1/1.png")
        expect(images.first.image).not_to be_nil

        expect(elements.select { |e| e.tag == "img" }).not_to be_empty
        expect(elements.select { |e| e.tag == "code" }).not_to be_empty
      end
    end
  end
end
