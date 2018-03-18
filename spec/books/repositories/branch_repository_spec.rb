require_relative '../../spec_helper'

describe BranchRepository do
  let(:book_repo) { BookRepository.new }

  before do
    subject.clear
    book_repo.clear
  end

  let!(:book) { book_repo.create(name: "Exploding Rails") }


  context "#find_or_create_by_book_id_and_name" do
    context "when the branch does not exist" do
      it "creates a new branch" do
        branch = subject.find_or_create_by_book_id_and_name(book.id, "master")
        expect(branch.name).to eq("master")
        expect(branch.book_id).to eq(book.id)
      end
    end
  end

  context "when the branch exists" do
    let!(:existing_branch) { subject.create(book_id: book.id, name: "master") }

    it "uses the existing branch" do
      branch = subject.find_or_create_by_book_id_and_name(book.id, "master")
      expect(branch.id).to eq(existing_branch.id)
      expect(branch.name).to eq("master")
      expect(branch.book_id).to eq(book.id)
    end
  end
end
