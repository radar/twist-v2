require 'spec_helper'


describe Twist::Git do
  let(:target) { File.expand_path(File.join(__dir__, "../../repos")) }
  let(:branch) { "master" }

  before do
    FileUtils.rm_rf(target)
  end

  subject do
    Twist::Git.new(
      username: "radar",
      repo: "markdown_book_test",
      branch: branch,
      target: target,
    )
  end

  context "#local_path" do
    it "returns a local path for a repository" do
      expected_local_path = File.expand_path(File.join(__dir__, "../../repos/radar/markdown_book_test"))
      expect(subject.local_path.to_s).to eq(expected_local_path)
    end
  end

  context "clone" do
    before { subject.clone }
    let(:head_branch) { subject.rugged_repo.head.name.split("/").last }

    it "locally sources the repo (sustainably)" do
      path = File.expand_path(File.join(__dir__, "../twist/repos/radar/markdown_book_test"))
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

  context "update" do
    let!(:source_repo) { Rugged::Repository.new(subject.source_path) }
    before do
      source_repo.reset("origin/master", :hard)

      subject.clone

      Dir.chdir(subject.source_path) do
        `git checkout master`
        `git commit --allow-empty -m "new commit"`
      end
    end

    after do
      source_repo.reset("origin/master", :hard)
    end

    let!(:latest) { source_repo.head.target_id }

    it "updates local repository" do
      subject.update
      expect(subject.rugged_repo.head.target_id).to eq(latest)
    end

    context "when local changes have been made" do
      before do
        Dir.chdir(subject.local_path) do
          `git rm manuscript/Book.txt`
        end
      end

      it "restores back to pristine state" do
        subject.update

        Dir.chdir(subject.local_path) do
          expect(File).to exist("manuscript/Book.txt")
        end
      end
    end
  end

  context "head" do
    before { subject.clone }

    it "returns a sha of the HEAD" do
      expect(subject.head.oid).to eq("122d2712d9214913cdff8ffd568e11985147bff7")
    end
  end
end
