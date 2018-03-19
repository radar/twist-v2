require 'spec_helper'

describe Git do
  let(:target) { File.expand_path(File.join(__dir__, "../repos")) }
  let(:branch) { "master" }

  before do
    FileUtils.rm_rf(target)
  end

  subject do
    Git.new(
      username: "radar",
      repo: "markdown_book_test",
      branch: branch,
      test: true,
      target: target,
    )
  end

  context "#local_path" do
    it "returns a local path for a repository" do
      expected_local_path = File.expand_path(File.join(__dir__, "../repos/radar/markdown_book_test"))
      expect(subject.local_path).to eq(expected_local_path)
    end
  end

  context "clone" do
    before { subject.clone }
    let(:head_branch) { subject.rugged_repo.head.name.split("/").last }

    it "locally sources the repo (sustainably)" do
      path = File.expand_path(File.join(__dir__, "../fixtures/radar/markdown_book_test"))
      expect(subject.rugged_repo.remotes.first.url).to eq(path)
    end

    it "clones a repository" do
      path = Pathname.new(subject.local_path)
      expect(path.exist?).to eq(true)
    end

    it "checks out to the master branch" do
      expect(head_branch).to eq("master")
    end

    context "using 2nd-branch" do
      let(:branch) { "2nd-branch" }

      it "checks out to the 2nd branch" do
        expect(head_branch).to eq("master")
      end
    end
  end
end
