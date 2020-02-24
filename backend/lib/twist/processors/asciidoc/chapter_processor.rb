module Twist
  module Asciidoc
    class ChapterProcessor
      include Sidekiq::Worker

      include Import[
        "repositories.image_repo",
        "repositories.element_repo",
        "repositories.chapter_repo",
        "repositories.book_repo"
      ]

      def perform(book_permalink, chapter_id, chapter)
        fragment = Nokogiri::HTML::DocumentFragment.parse(chapter)
        @book = book_repo.find_by_permalink(book_permalink)
        @chapter = chapter_repo.by_id(chapter_id)
        element_repo.delete_all_chapter_elements(chapter_id)
        process_content(fragment.children.first.children)
      end

      private

      attr_reader :book, :chapter, :chapter_element

      def process_content(elements)
        elements.each do |element|
          m = "process_#{element.name}"
          if respond_to?(m, true)
            send(m, element)
          else
            puts element.to_html
            raise "I don't know how to process a #{element.name}!"
          end
        end
      end

      def process_text(element)
        # TODO: Is there any blank text we wish to include?
        element.text
      end

      # Real HTML elements that aren't divs

      # H2s are chapter titles, but Twist would rather they be h1s.
      # H1s in Asciidoc-land are book titles
      def process_h2(element)
        # Chapter titles are already handled, so no need to create one.
        # chapter.elements.create!(
        #   tag: "h1",
        #   content: element.to_html
        # )
      end

      def process_h3(element)
        create_header("h2", element.text)
      end

      def process_h4(element)
        create_header("h3", element.text)
      end

      def process_h5(element)
        create_header("h4", element.text)

      end

      def create_header(header, text)
        create_element(
          tag: header.to_s,
          content: "<#{header}>#{text}</#{header}>",
        )
      end

      def process_table(element)
        create_element(
          tag: "table",
          content: element.to_html,
        )
      end

      # Div-ified elements after this point.

      def process_div(element)
        return unless element["class"]

        case element["class"]
        when "sectionbody"
          process_content(element.children)
        when "paragraph"
          process_paragraph(element)
        when "listingblock"
          process_listingblock(element)
        when "imageblock"
          process_imageblock(element)
        when "ulist"
          process_ulist(element)
        when /^olist/
          process_olist(element)
        when "quoteblock"
          process_quoteblock(element)
        when "sidebarblock"
          process_sidebarblock(element)
        when /^admonitionblock/
          process_admonitionblock(element)
        when "sect2", "sect3", "sect4"
          process_content(element.children)
        else
          puts element.to_html
          raise "Unknown div #{element["class"]}!"
        end
      end

      def process_paragraph(element)
        create_element(
          tag: "p",
          content: element.css("p").to_html,
        )
      end

      def process_listingblock(element)
        create_element(
          tag: "div",
          content: element.to_s,
        )
      end

      def process_imageblock(element)
        src = element.css("img").first["src"]
        candidates = Dir[book.path + "**/#{src}"]
        # TODO: what if more than one image matches the path?
        p book.path
        p src
        image_path = candidates.first
        if File.exist?(image_path)
          caption = element.css("div.title").text.strip
          image_repo.find_or_create_image(chapter.id, File.basename(image_path), image_path, caption)
          # chapter.images.create!(
          #   image: File.open(image_path),
          #   caption: element.css(".title").text.strip.gsub(/^Figure \d+\.\s+/, ''),
          #   position: chapter.images.count + 1,
          # )
        end

        create_element(
          tag: "img",
          content: src
        )
      end

      def process_ulist(element)
        create_element(
          tag: "ul",
          content: element.css("ul").to_html
        )
      end

      def process_olist(element)
        create_element(
          tag: "ol",
          content: element.css("ol").to_html
        )
      end

      def process_quoteblock(element)
        create_element(
          tag: "div",
          content: element.to_html
        )
      end

      def process_sidebarblock(element)
        create_element(
          tag: "div",
          content: element,
        )
      end

      def process_admonitionblock(element)
        create_element(
          tag: "div",
          content: <<-HTML.strip
            <div class="#{element["class"]}">
              #{element.css(".content").first.inner_html.strip}
            </div>
          HTML
        )
      end

      def create_element(tag:, content:, extra: {})
        raise "Stringify content before passing it to this method!" unless content.is_a?(String)

        element_repo.create({
          chapter_id: chapter.id,
          tag: tag,
          content: content,
        }.merge(extra))
      end
    end
  end
end