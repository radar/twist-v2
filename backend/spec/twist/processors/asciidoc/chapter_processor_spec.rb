require "spec_helper"

module Twist
  module Asciidoc
    describe ChapterProcessor do
      let(:book_repo) { Repositories::BookRepo.new }
      let(:branch_repo) { Repositories::BranchRepo.new }
      let(:chapter_repo) { Repositories::ChapterRepo.new }
      let(:commit_repo) { Repositories::CommitRepo.new }
      let(:footnote_repo) { Repositories::FootnoteRepo.new }
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

      def elements_by_tag(tag)
        element_repo.by_chapter_and_tag(chapter.id, tag)
      end

      before(:all) do
        git = Git.new(
          username: "radar",
          repo: "asciidoc_book_test",
        )
        git.fetch!
      end

      def perform
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

      context "normal elements" do
        before do
          perform
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

          # Chapters that are processed twice (for example, due to a Sidekiq failure)
          # can have duplicate elements. This test makes sure this does not happen.
          it "only has one P tag" do
            perform
            expect(elements_by_tag("p").count).to eq(1)
          end
        end

        context "div.literalblock" do
          let(:content) do
            <<~CONTENT
              <div class="literalblock">
                <div class="content">
                  <pre>The test then fills in the "Name" and "Cost" fields by using the `fill_in` method. Then, it clicks the "Create Purchase" button with `click_button`. These methods all come from the Capybara gem.</pre>
                </div>
              </div>
            CONTENT
          end

          it "adds element to the chapter" do
            expect(elements_by_tag("div").count).to eq(1)
          end
        end

        context "div.listingblock, with pre + code" do
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

            fragment = Nokogiri::HTML::DocumentFragment.parse(element.content)
            listing_block = fragment.css(".listingblock").first
            expect(listing_block).to be_truthy
            expect(listing_block['class']).to include("lang-ruby")
            expect(fragment.css(".title").text).to eq("book.rb")
            expect(fragment.css(".content .highlight .kr")).to be_truthy
          end
        end

        context "div.listingblock, with pre + code, as yml" do
          let(:content) do
            <<-HTML.strip
              <div class="listingblock">
              <div class="title">book.yml</div>
              <div class="content">
              <pre class="highlight"><code class="language-yml" data-lang="yml">hello:
                world: true</code></pre>
              </div>
            </div>
            HTML
          end

          it "adds the listingblock element to the chapter" do
            element = elements_by_tag("div").first

            fragment = Nokogiri::HTML::DocumentFragment.parse(element.content)
            listing_block = fragment.css(".listingblock").first
            expect(listing_block).to be_truthy
            expect(listing_block['class']).to include("lang-yaml")
            expect(fragment.css(".title").text).to eq("book.yml")
            expect(fragment.css(".content .highlight .kr")).to be_truthy
          end
        end

        context "div.listingblock, with pre + code, but no title" do
          let(:content) do
            <<-HTML.strip
              <div class="listingblock">
              <div class="title"></div>
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

            fragment = Nokogiri::HTML::DocumentFragment.parse(element.content)
            listing_block = fragment.css(".listingblock").first
            expect(listing_block).to be_truthy
            expect(listing_block['class']).to include("lang-ruby")
            expect(fragment.css(".title")).to be_empty
            expect(fragment.css(".content .highlight .kr")).to be_truthy
          end
        end

        context "div.listingblock, plaintext" do
          let(:content) do
            <<-HTML.strip
            <div class="listingblock">
              <div class="content">
                <pre>rails g controller posts</pre>
              </div>
            </div>
            HTML
          end

          it "adds the listingblock element to the chapter" do
            element = elements_by_tag("div").first

            fragment = Nokogiri::HTML::DocumentFragment.parse(element.content)
            listing_block = fragment.css(".listingblock").first
            expect(listing_block['class']).to include('plaintext')
            expect(listing_block).to be_truthy
            expect(fragment.text).to include("rails g controller posts")
          end
        end

        context "div.imageblock" do
          context "when the image exists" do
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
              expect(element.image_id).to eq(image.id)
              expect(image.filename).to eq("welcome_aboard.png")

              expect(image.caption).to eq("Figure 1. Welcome aboard!")
            end
          end

          context "when the image is missing" do
            let(:content) do
              <<-HTML.strip
              <div class="imageblock">
                <div class="content">
                  <img src="ch01/images/image-has-gone-walkabouts.png" alt="welcome aboard">
                </div>
                <div class="title">
                  Figure 1. Welcome aboard!
                </div>
              </div>
              HTML
            end

            it "adds the imageblock element to the chapter" do
              element = elements_by_tag("img").first
              expect(element.content).to eq("ch01/images/image-has-gone-walkabouts.png")

              image = image_repo.by_chapter(chapter.id).last
              expect(element.image_id).to eq(image.id)
              expect(image.filename).to eq("image_missing.png")
              expect(image.caption).to eq("Image missing: ch01/images/image-has-gone-walkabouts.png")
            end
          end
        end

        context "div.sect2 w/ blank para" do
          let(:content) do
            <<-HTML
            <div class="sect2">
              <div class="paragraph">
                <p></p>
              </div>
            </div>
            HTML
          end

          it "does not add the paragraph to the chapter" do
            expect(elements_by_tag("p")).to be_empty
          end
        end

        context "div.sect2 w/ h3 & div.para" do
          let(:content) do
            <<-HTML
            <div class="sect2">
              <h3 id="_sect_2_title">Sect2 title</h3>
              <div class="paragraph">
                <p>Simple para inside of a sect2</p>
              </div>
            </div>
            HTML
          end

          it "adds the h3 and para elements to the chapter" do
            h2_element = elements_by_tag("h2").first
            expect(h2_element.content).to eq(%q{<h2 id="_sect_2_title">Sect2 title</h2>})

            para_element = elements_by_tag("p").first
            expect(para_element.content).to eq("<p>Simple para inside of a sect2</p>")
          end
        end

        context "div.sect3 w/ h4 & div.para" do
          let(:content) do
            <<-HTML
            <div class="sect3">
              <h4 id="_sect_3_title">Sect3 title</h4>
              <div class="paragraph">
                <p>Simple para inside of a sect3</p>
              </div>
            </div>
            HTML
          end

          it "adds the h3 and para elements to the chapter" do
            h3_element = elements_by_tag("h3").first
            expect(h3_element.content).to eq(%{<h3 id="_sect_3_title">Sect3 title</h3>})


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

      context "div.sect2 w/ h3 & div.para containing a footnote" do
        let(:identifier_1) { "_footnotedef_1" }
        let(:identifier_2) { "_footnotedef_2" }
        before do
          footnote_repo.create(
            commit_id: commit.id,
            identifier: identifier_1,
            content: "Nothing to see here.",
          )

          footnote_repo.create(
            commit_id: commit.id,
            identifier: identifier_2,
            content: "Nothing to see here.",
          )

          perform
        end

        let(:content) do
          <<-HTML
          <div class="sect2">
            <h3 id="_sect_2_title">Sect2 title</h3>
            <div class="paragraph">
              <p>There's more<sup class="footnote">[<a id="_footnoteref_1" class="footnote" href="##{identifier_1}" title="View footnote.">1</a>]</sup> to this paragraph.<sup class="footnote">[<a id="_footnoteref_3" class="footnote" href="##{identifier_2}" title="View footnote.">3</a>]</sup></p>
            </div>
          </div>
          HTML
        end

        it "links footnotes to this chapter" do
          # Call perform again, as it is called _before_ footnotes are created otherwise
          perform

          footnote_1 = footnote_repo.by_identifier(identifier_1)
          expect(footnote_1.chapter_id).to eq(chapter.id)

          footnote_2 = footnote_repo.by_identifier(identifier_2)
          expect(footnote_2.chapter_id).to eq(chapter.id)
        end
      end
    end
  end
end
