require_relative '../../spec_helper'

describe ImageRepository do
  let(:book_repo) { BookRepository.new }
  let(:chapter_repo) { ChapterRepository.new }
  let(:branch_repo) { BranchRepository.new }
  let(:commit_repo) { CommitRepository.new }

  let(:book) { book_repo.create(permalink: "markdown_book_test") }
  let(:branch) { book_repo.add_branch(book, name: "master") }
  let(:commit) { commit_repo.create(branch_id: branch.id, sha: "abc123") }
  let(:chapter) { chapter_repo.create(commit_id: commit.id, title: "Chapter 1") }

  let(:image_path) { "spec/books/repos/radar/markdown_book_test/images/chapter_1/1.png" }
  let(:filename) { File.basename(image_path) }

  context "find_or_create_image" do
    context "when an image does not exist" do
      it "creates a new image" do
        image = subject.find_or_create_image(chapter.id, filename, image_path)
        expect(image.chapter_id).to eq(chapter.id)
        expect(image.filename).to eq(filename)
        expect(image.image_data).not_to be_nil
      end
    end

    context "when an image exists" do
      let!(:existing_image) do
        subject.create(
          chapter_id: chapter.id,
          filename: filename,
        )
      end

      it "updates the existing image" do
        image = subject.find_or_create_image(chapter.id, filename, image_path)
        expect(image.id).to eq(existing_image.id)
        expect(image.chapter_id).to eq(chapter.id)
        expect(image.filename).to eq(filename)
        expect(image.image_data).not_to be_nil
      end
    end
  end
end
