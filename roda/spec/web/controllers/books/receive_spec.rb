require "spec_helper"

describe Web::Controllers::Books::Receive do
  let(:params) do
    {
      permalink: "exploding-rails",
      ref: "refs/heads/master",
      repository: {
        full_name: "radar/exploding_rails",
      },
    }
  end

  context "when book exists" do
    context "and the book is a markdown book" do
      let(:book) { Book.new(permalink: "exploding-rails", format: "markdown") }
      let(:branch) { Branch.new(name: "master") }
      before { allow(subject).to receive(:find_book) { book } }
      before { allow(subject).to receive(:find_or_create_branch) { branch } }

      it "triggers an update" do
        expect(MarkdownBookWorker).to receive(:perform_async)
          .with(
            permalink: "exploding-rails",
            branch: "master",
            github_path: "radar/exploding_rails",
          )
        status, _, body = subject.(params)
        expect(status).to eq(200)
        expect(body.first).to eq("OK")
      end
    end
  end

  context "when the book does not exist" do
    before { allow(subject).to receive(:find_book) { nil } }

    it "reports back the book cannot be found" do
      status, _, body = subject.(params)
      expect(status).to eq(404)
      expect(JSON.parse(body.first)).to eq("error" => "Book not found")
    end
  end
end
