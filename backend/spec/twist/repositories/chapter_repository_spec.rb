require_relative '../../spec_helper'

module Twist
  module Repositories
    describe ChapterRepo do
      let(:book_repo) { BookRepo.new }
      let(:branch_repo) { BranchRepo.new }
      let(:commit_repo) { CommitRepo.new }

      let(:book) { book_repo.create(title: "Markdown Book Test") }
      let(:branch) { branch_repo.create(book_id: book.id, name: "master") }
      let(:commit) { commit_repo.create(branch_id: branch.id) }

      context "mark as superseded" do
        let!(:chapter) { subject.create(commit_id: commit.id, part: "mainmatter", position: 2) }

        it "marks chapter as superseded" do
          subject.mark_as_superseded(commit.id)
          updated_chapter = subject.by_id(chapter.id)
          expect(updated_chapter.superseded).to eq(true)
        end
      end

      context "for_commit_and_part" do
        let!(:superseded_chapter) { subject.create(commit_id: commit.id, part: "mainmatter", position: 2, superseded: true) }
        let!(:chapter) { subject.create(commit_id: commit.id, part: "mainmatter", position: 2) }

        it "does not return superseded chapters" do
          chapters = subject.for_commit_and_part(commit.id, "mainmatter")
          expect(chapters).to include(chapter)
          expect(chapters).to_not include(superseded_chapter)
        end
      end

      context "previous_chapter" do
        it "finds previous chapter within the same part" do
          current_chapter = subject.create(commit_id: commit.id, part: "mainmatter", position: 2)
          _previous_superseded_chapter = subject.create(commit_id: commit.id, part: "mainmatter", position: 1, superseded: true)
          previous_chapter = subject.create(commit_id: commit.id, part: "mainmatter", position: 1)

          expect(subject.previous_chapter(commit.id, current_chapter)).to eq(previous_chapter)
        end

        it "finds the previous chapter in the previous part" do
          current_chapter = subject.create(commit_id: commit.id, part: "mainmatter", position: 1)
          previous_chapter = subject.create(commit_id: commit.id, part: "frontmatter", position: 1)

          expect(subject.previous_chapter(commit.id, current_chapter)).to eq(previous_chapter)
        end
      end

      context "next_chapter" do
        it "finds next chapter within the same part" do
          current_chapter = subject.create(commit_id: commit.id, part: "mainmatter", position: 1)
          _next_superseded_chapter = subject.create(commit_id: commit.id, part: "mainmatter", position: 2, superseded: true)
          next_chapter = subject.create(commit_id: commit.id, part: "mainmatter", position: 2)

          expect(subject.next_chapter(commit.id, current_chapter)).to eq(next_chapter)
        end

        it "finds the next chapter in the next part" do
          current_chapter = subject.create(commit_id: commit.id, part: "mainmatter", position: 1)
          next_chapter = subject.create(commit_id: commit.id, part: "backmatter", position: 1)

          expect(subject.next_chapter(commit.id, current_chapter)).to eq(next_chapter)
        end
      end

      context "next_position" do
        context "when a chapter already exists" do
          before do
            subject.create(commit_id: commit.id, part: "mainmatter", position: 1)
          end

          it "position is 2" do
            next_position = subject.next_position(commit.id, "mainmatter")
            expect(next_position).to eq(2)
          end
        end

        context "when a superseded chapter already exists" do
          before do
            subject.create(commit_id: commit.id, part: "mainmatter", position: 1, superseded: true)
          end

          it "position is 1" do
            next_position = subject.next_position(commit.id, "mainmatter")
            expect(next_position).to eq(1)
          end
        end

        context "when there is no chapter" do
          it "position is 1" do
            next_position = subject.next_position(commit.id, "mainmatter")
            expect(next_position).to eq(1)
          end
        end
      end
    end
  end
end
