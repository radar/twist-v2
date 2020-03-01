require "spec_helper"

module Twist
  module Asciidoc
    describe Footnote do
      let(:footnote_repo) { double(Twist::Repositories::FootnoteRepo) }
      let(:identifier) { "_footnotedef_2" }

      let(:content) do
        html = <<~HTML
        <div class="footnote" id="#{identifier}">
          <a href="#_footnoteref_2">2</a>. A wild footnote appears!
        </div>
        HTML
      end

      let(:element) do
        Nokogiri::HTML::DocumentFragment.parse(content).children.first
      end

      let(:commit) do
        double(Commit, id: 1)
      end

      subject do
        described_class.new(
          footnote_repo: footnote_repo,
          element: element,
          commit: commit
        )
      end

      describe "process" do
        it "creates a new footnote" do
          expect(footnote_repo).to receive(:find_or_create).with(
            commit_id: commit.id,
            identifier: identifier,
            content: content.strip,
          )

          subject.process
        end
      end
    end
  end
end
