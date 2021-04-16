require "spec_helper"

module Twist
  module Markdown
    describe ElementProcessor do
      let(:chapter) { double(Twist::Chapter, title: "Chapter title") }
      let(:book_path) { "fake/path/to/book" }
      let(:element_repo) { double }

      subject do
        described_class.new(chapter, book_path)
      end

      context "with a h2" do
        let(:markup) do
          Nokogiri::HTML.fragment("<h2 id='header_0'>Hello World</h2>").at("h2")
        end

        it "customises the id attribute on h2s" do
          expect(subject).to receive(:create_element).with(
            "<h2 id=\"hello-world\">Hello World</h2>",
            "h2",
            identifier: "hello-world",
          )

          subject.process!(markup)
        end
      end

      context "with a h3" do
        let(:markup) do
          Nokogiri::HTML.fragment("<h3 id='header_0'>Hello World</h3>").at("h3")
        end

        it "customises the id attribute on h3s" do
          expect(subject).to receive(:create_element).with(
            "<h3 id=\"hello-world\">Hello World</h3>",
            "h3",
            identifier: "hello-world",
          )

          subject.process!(markup)
        end
      end

      context "with a p, containing a missing image" do
        let(:markup) do
          Nokogiri::HTML.fragment("<p><img src='404.png' />Hello World</p>").at("p")
        end

        it "does not try to call create element" do
          expect(subject).not_to receive(:create_element).with(
            "<img src='404.png' />",
            "img"
          )

          subject.process!(markup)
        end
      end
    end
  end
end
