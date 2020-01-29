require 'spec_helper'

describe Git, integration: true do
  let(:target) { File.expand_path(File.join(__dir__, "../repos")) }

  subject do
    Git.new(
      username: "radar",
      repo: "markdown_book_test",
      target: target,
    )
  end

  before { FileUtils.rm_rf(target) }

  context "clone" do
    it "successfully clones from GitHub" do
      subject.clone

      expect(subject.rugged_repo.remotes.first.url).to eq("git@github.com:radar/markdown_book_test")
    end
  end
end
