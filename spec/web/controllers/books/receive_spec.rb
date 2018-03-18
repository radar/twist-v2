require_relative '../../../spec_helper'

describe Web::Controllers::Books::Receive do
  let(:params) do
    {
      permalink: "exploding-rails",
      ref: "refs/heads/master"
    }
  end


  context "when book exists" do
    let(:book) { Book.new(permalink: "exploding-rails") }
    before { allow(subject).to receive(:find_book) { book } }

    it "triggers an update" do
      expect(BookWorker).to receive(:perform_async).with("exploding-rails", "master")
      status, _, _ = subject.call(params)
      expect(status).to eq(200)
    end
  end

  context "when the book does not exist" do
    before { allow(subject).to receive(:find_book) { nil } }

    it "reports back the book cannot be found" do
      status, _, body = subject.call(params)
      expect(status).to eq(404)
      expect(JSON.parse(body.first)).to eq({"error" => "Book not found"})
    end
  end
end
