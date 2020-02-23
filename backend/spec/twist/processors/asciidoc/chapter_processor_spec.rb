require "spec_helper"

module Twist
  module Asciidoc
    describe ChapterProcessor do
      let(:book_repo) { Repositories::BookRepo.new }
      let(:branch_repo) { Repositories::BranchRepo.new }
      let(:chapter_repo) { Repositories::ChapterRepo.new }
      let(:commit_repo) { Repositories::CommitRepo.new }
      let(:element_repo) { Repositories::ElementRepo.new }
      let(:image_repo) { Repositories::ImageRepo.new }

      let!(:book) do
        book_repo.create(
          title: "Asciidoc Book Test",
          github_user: "radar",
          github_repo: "asciidoc_book_test",
        )
      end

      let!(:branch) { book_repo.add_branch(book, name: "master") }
      let!(:commit) do
        commit_repo.create(sha: "abc123", branch_id: branch.id)
      end
      let(:chapter) do
        chapter_repo.create(
          commit_id: commit.id,
          name: "Chapter 1",
        )
      end

      let(:element) do
        build_chapter_element <<-HTML
          #{content}
        HTML
      end

      let(:elements) do
        element_repo.by_chapter(chapter.id)
      end

      let(:git) do
        Git.new(
          username: "radar",
          repo: "asciidoc_book_test",
        )
      end

      def elements_by_tag(tag)
        element_repo.by_chapter_and_tag(chapter.id, tag)
      end

      before do
        git.fetch!
        subject.perform(book.permalink, chapter.id, element.to_s)
      end

      def build_chapter_element(tags)
        Nokogiri::HTML.parse(<<-HTML,
          <div class="sect1">
            #{tags}
          </div>
        HTML
        ).css(".sect1")
      end

      context "h2" do
        let(:content) { %Q{<h2 id="_chapter_1">1. Chapter 1</h2>} }

        # Chapter title has already been handled
        it "adds no element to the chapter" do
          expect(elements.count).to eq(0)
        end
      end

      context "table" do
        let(:content) do
          <<-HTML.strip
          <table>
            <tr>
              <td>A table.</td>
            </tr>
          </table>
          HTML
        end

        it "adds the table element to the chapter" do
          element = elements_by_tag("table").first
          expect(element.content).to eq(content)
        end
      end

      context "div.paragraph" do
        let(:content) { %Q{<div class="paragraph"><p>Simple paragraph</p></div>} }

        it "adds a p element to the chapter" do
          element = elements_by_tag("p").first
          expect(element.content).to eq("<p>Simple paragraph</p>")
        end
      end

      context "div.listingblock" do
        let(:content) do
          <<-HTML.strip
            <div class="listingblock">
            <div class="title">book.rb</div>
            <div class="content">
            <pre class="highlight"><code class="language-ruby" data-lang="ruby">class Book
              attr_reader :title

              def initialize(title)
                @title = title
              end
            end</code></pre>
            </div>
          </div>
          HTML
        end

        it "adds the listingblock element to the chapter" do
          element = elements_by_tag("div").first
          expect(element.content).to eq(content)
        end
      end

      context "div.imageblock" do
        let(:content) do
          <<-HTML.strip
          <div class="imageblock">
            <div class="content">
              <img src="ch01/images/welcome_aboard.png" alt="welcome aboard">
            </div>
            <div class="title">
              Figure 1. Welcome aboard!
            </div>
          </div>
          HTML
        end

        it "adds the imageblock element to the chapter" do
          element = elements_by_tag("img").first
          expect(element.content).to eq("ch01/images/welcome_aboard.png")


          image = image_repo.by_chapter(chapter.id).last
          expect(image.filename).to eq("welcome_aboard.png")
          expect(image.caption).to eq("Figure 1. Welcome aboard!")
        end
      end

      context "div.sect2 w/ h3 & div.para" do
        let(:content) do
          <<-HTML
          <div class="sect2">
            <h3>Sect2 title</h3>
            <div class="paragraph">
              <p>Simple para inside of a sect2</p>
            </div>
          </div>
          HTML
        end

        it "adds the h3 and para elements to the chapter" do
          h2_element = elements_by_tag("h2").first
          expect(h2_element.content).to eq("<h2>Sect2 title</h2>")

          para_element = elements_by_tag("p").first
          expect(para_element.content).to eq("<p>Simple para inside of a sect2</p>")
        end
      end

      context "div.sect3 w/ h4 & div.para" do
        let(:content) do
          <<-HTML
          <div class="sect3">
            <h4>Sect3 title</h4>
            <div class="paragraph">
              <p>Simple para inside of a sect3</p>
            </div>
          </div>
          HTML
        end

        it "adds the h3 and para elements to the chapter" do
          h3_element = elements_by_tag("h3").first
          expect(h3_element.content).to eq("<h3>Sect3 title</h3>")


          para_element = elements_by_tag("p").first
          expect(para_element.content).to eq("<p>Simple para inside of a sect3</p>")
        end
      end

      context "div.sect4 w/ h5 & div.para" do
        let(:content) do
          <<-HTML
          <div class="sect4">
            <h5>Sect4 title</h5>
            <div class="paragraph">
              <p>Simple para inside of a sect4</p>
            </div>
          </div>
          HTML
        end

        it "adds h4 and para elements to the chapter" do
          h4_element = elements_by_tag("h4").first
          expect(h4_element.content).to eq("<h4>Sect4 title</h4>")

          para_element = elements_by_tag("p").first
          expect(para_element.content).to eq("<p>Simple para inside of a sect4</p>")
        end
      end

      context "div.admonitionblock" do
        let(:content) do
          <<-HTML.strip
          <div class="admonitionblock note">
            <table>
              <tr>
                <td class="icon">
                  <div class="title">Note</div>
                </td>
                <td class="content">
                  <div class="title">This is a note</div>
                  <div class="paragraph">
                    <p>Notes stand out different from the text.</p>
                  </div>

                  <div class="listingblock">
                    <div class="content">
                      <pre>$ rails new rails
                      Invalid application name rails, constant Rails is already in use.
                      Please choose another application name.
                      $ rails new test
                      Invalid application name test. Please give a name which does not match one of
                      the reserved rails words.</pre>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          HTML
        end

        it "adds the admonitionblock element to the chapter" do
          element = elements_by_tag("div").first
          expected =
          <<-HTML.strip
            <div class="admonitionblock note">
              <div class="title">This is a note</div>
              <div class="paragraph">
                <p>Notes stand out different from the text.</p>
              </div>

              <div class="listingblock">
                <div class="content">
                  <pre>$ rails new rails
                  Invalid application name rails, constant Rails is already in use.
                  Please choose another application name.
                  $ rails new test
                  Invalid application name test. Please give a name which does not match one of
                  the reserved rails words.</pre>
                </div>
              </div>
            </div>
          HTML
          expect(element.content.gsub(/^\s+/, '')).to eq(expected.gsub(/^\s+/, ''))
        end
      end

      context "div.ulist" do
        let(:content) do
          <<-HTML.strip
          <div class="ulist">
            <ul>
              <li><p>Item 1</p></li>
              <li><p>Item 2</p></li>
              <li><p>Item 3</p></li>
            </ul>
          </div>
          HTML
        end

        it "adds the ul element to the chapter" do
          element = elements_by_tag("ul").first
          expect(element.content).to eq(<<-HTML.strip,
            <ul>
              <li><p>Item 1</p></li>
              <li><p>Item 2</p></li>
              <li><p>Item 3</p></li>
            </ul>
          HTML
          )
        end
      end

      context "div.olist" do
        let(:content) do
          <<-HTML.strip
          <div class="olist arabic">
            <ol>
              <li><p>Item 1</p></li>
              <li><p>Item 2</p></li>
              <li><p>Item 3</p></li>
            </ol>
          </div>
          HTML
        end

        it "adds the ol element to the chapter" do
          element = elements_by_tag("ol").first
          expect(element.content).to eq(<<-HTML.strip,
            <ol>
              <li><p>Item 1</p></li>
              <li><p>Item 2</p></li>
              <li><p>Item 3</p></li>
            </ol>
          HTML
          )
        end
      end

      context "div.quoteblock" do
        let(:content) do
          <<-HTML.strip
          <div class="quoteblock">
            <blockquote>
              <div class="paragraph">
                <p>May the force be with you.</p>
              </div>
            </blockquote>
            <div class="attribution">
              — Gandalf
            </div>
          </div>
          HTML
        end

        it "adds the quoteblock element to the chapter" do
          element = elements_by_tag("div").first
          expect(element.content).to eq(content)
        end
      end
    end
  end
end
