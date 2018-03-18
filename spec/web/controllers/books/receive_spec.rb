require_relative '../../../spec_helper'

describe Web::Controllers::Books::Receive do
  let(:params) do
    {
      permalink: "exploding-rails",
      ref: "refs/heads/master"
    }
  end

  context "when book exists" do
    context "and the book is a markdown book" do
      let(:book) { Book.new(permalink: "exploding-rails", format: "markdown") }
      before { allow(subject).to receive(:find_book) { book } }

      it "triggers an update" do
        expect(MarkdownBookWorker).to receive(:perform_async).with("exploding-rails", "master")
        status, = subject.call(params)
        expect(status).to eq(200)
      end
    end
  end

  context "when the book does not exist" do
    before { allow(subject).to receive(:find_book) { nil } }

    it "reports back the book cannot be found" do
      status, _, body = subject.call(params)
      expect(status).to eq(404)
      expect(JSON.parse(body.first)).to eq("error" => "Book not found")
    end
  end
end
