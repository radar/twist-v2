require_relative '../../spec_helper'

describe BranchRepository do
  before { subject.clear }

  context "#find_or_create_by_book_id_and_name" do
    context "when the branch does not exist" do
      it "creates a new branch" do
        branch = subject.find_or_create_by_book_id_and_name(1, "master")
        expect(branch.name).to eq("master")
        expect(branch.book_id).to eq(1)
      end
    end
  end

  context "when the branch exists" do
    let!(:existing_branch) { subject.create(book_id: 1, name: "master") }

    it "uses the existing branch" do
      branch = subject.find_or_create_by_book_id_and_name(1, "master")
      expect(branch.id).to eq(existing_branch.id)
      expect(branch.name).to eq("master")
      expect(branch.book_id).to eq(1)
    end
  end
end
