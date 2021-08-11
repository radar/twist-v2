require_relative '../../spec_helper'

module Twist
  module Repositories
    describe ImageRepo do
      let(:book_repo) { BookRepo.new }
      let(:chapter_repo) { ChapterRepo.new }
      let(:branch_repo) { BranchRepo.new }
      let(:commit_repo) { CommitRepo.new }

      let(:book) { book_repo.create(permalink: "markdown_book_test") }
      let(:branch) { book_repo.add_branch(book, name: "master") }
      let(:commit) { commit_repo.create(branch_id: branch.id, sha: "abc123") }
      let(:chapter) { chapter_repo.create(commit_id: commit.id, title: "Chapter 1") }

      let(:image_path) { "spec/twist/repos/radar/markdown_book_test/manuscript/images/chapter_1/1.png" }
      let(:filename) { File.basename(image_path) }

      context "find_or_create_image" do
        context "when an image does not exist" do
          it "creates a new image" do
            image = subject.find_or_create_image(chapter.id, filename, image_path, "Hello World")
            expect(image.chapter_id).to eq(chapter.id)
            expect(image.filename).to eq(filename)
            expect(image.caption).to eq("Hello World")
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
            image = subject.find_or_create_image(chapter.id, filename, image_path, "Hello World")
            expect(image.id).to eq(existing_image.id)
            expect(image.chapter_id).to eq(chapter.id)
            expect(image.filename).to eq(filename)
            expect(image.caption).to eq("Hello World")
          end
        end
      end
    end
  end
end
