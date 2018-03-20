require "spec_helper"

describe MarkdownChapterProcessor do
  let(:book_repo) { BookRepository.new }
  let(:element_repo) { ElementRepository.new }
  let(:image_repo) { ImageRepository.new }

  let!(:book) { book_repo.create(permalink: "markdown_book_test") }
  let!(:branch) { book_repo.add_branch(book, name: "master") }
  let!(:git) do
    Git.new(
      username: "radar",
      repo: "markdown_book_test",
    )
  end

  subject do
    MarkdownChapterProcessor.new(
      branch,
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
