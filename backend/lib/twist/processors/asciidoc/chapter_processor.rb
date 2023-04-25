module Twist
  module Processors
    module Asciidoc
      class ChapterProcessor
        include Sidekiq::Worker

        sidekiq_options retry: 0

        include Import[
          "repositories.image_repo",
          "repositories.element_repo",
          "repositories.commit_repo",
          "repositories.footnote_repo",
          "repositories.chapter_repo",
          "repositories.book_repo",
          "logger"
        ]

        def perform(book_permalink, chapter_id, chapter)
          fragment = Nokogiri::HTML::DocumentFragment.parse(chapter)
          @book = book_repo.find_by_permalink(book_permalink)
          @chapter = chapter_repo.by_id(chapter_id)
          @commit = commit_repo.by_id(@chapter.commit_id)
          element_repo.delete_all_chapter_elements(chapter_id)

          content = fragment.children.first.children

          content.css("sup.footnote a").each do |footnote|
            process_footnote(footnote)
          end

          process_content(content)
        end

        private

        attr_reader :book, :chapter, :commit, :chapter_element

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
          create_header("h2", element)
        end

        def process_h4(element)
          create_header("h3", element)
        end

        def process_h5(element)
          create_header("h4", element)
        end

        def create_header(tag, element)
          element.name = tag
          create_element(
            tag: tag,
            identifier: element.text.gsub(/^[\d|.]+/, "").to_slug.normalize.to_s,
            content: element.to_html,
          )
        end

        def process_table(element)
          create_element(
            tag: "table",
            content: element.to_html,
          )
        end

        def process_hr(_element)
          create_element(
            tag: "hr",
          )
        end

        # Div-ified elements after this point.

        def process_div(element)
          return unless element["class"]

          classes = element["class"].split(" ")

          processed = false

          classes.each do |klass|
            if respond_to?("process_#{klass}", true)
              send("process_#{klass}", element)
              processed = true
            end
          end

          return if processed

          case element["class"]
          when "sectionbody", "sect2", "sect3", "sect4"
            process_content(element.children)
          else
            raise "Unknown div #{element["class"]}!"
          end
        end

        def process_paragraph(element)
          p_tag = element.css("p")

          return if p_tag.text.empty?

          create_element(
            tag: "p",
            content: element.css("p").to_html,
          )
        end

        def process_footnote(footnote)
          identifier = footnote["href"][1..-1]
          footnote_repo.link_to_commit_chapter(identifier, commit.id, chapter.id)
        end

        def process_literalblock(element)
          create_element(
            tag: "div",
            content: element.to_html,
          )
        end

        def process_colist(element)
          create_element(
            tag: "div",
            content: element.to_html,
          )
        end


        def process_listingblock(element)
          if element.css("pre code").any?
            return process_language_block(element)
          end

          element['class'] += " lang-plaintext"
          create_element(
            tag: "div",
            content: element.to_html,
          )
        end

        def process_language_block(element)
          code = element.css("pre code").first
          lang = case code['data-lang']
                when 'yml' then 'yaml'
                else code['data-lang']
                end

          lexer = Rouge::Lexer.find(lang)
          formatter = Rouge::Formatters::HTMLPygments.new(Rouge::Formatters::HTML.new)

          if lexer
            highlighted_code = formatter.format(lexer.lex(code.text))
          else
            logger.warn "Unknown language #{lang}!"
            highlighted_code = %{<pre><code>#{code.text}</code></pre>}
          end

          title = element.css(".title").text
          html = %{<div class="listingblock highlighted lang-#{lang}">}
          html << %{<div class="title">#{title}</div>} unless title.empty?
          html << %{<div class="content">#{highlighted_code}</div>}
          html << %{</div>}

          create_element(
            tag: "div",
            content: html,
          )
        end

        def process_imageblock(element)
          src = element.css("img").first["src"]
          candidates = Dir[book.path + "**/#{src}"]
          if candidates.any?
            # TODO: what if more than one image matches the path?
            image_path = candidates.first
            if File.exist?(image_path)
              caption = element.css("div.title").text.strip
            end
          else
            image_path = Twist::Container.root + "public/images/image_missing.png"
            caption = "Image missing: #{src}"
          end

          image = image_repo.find_or_create_image(chapter.id, File.basename(image_path), image_path, caption)

          create_element(
            tag: "img",
            content: src,
            extra: { image_id: image.id },
          )
        end

        def process_ulist(element)
          create_element(
            tag: "ul",
            content: element.css("ul").to_html,
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

        def create_element(tag:, content: "", identifier: nil, extra: {})
          raise "Stringify content before passing it to this method!" unless content.is_a?(String)

          element_repo.create({
            chapter_id: chapter.id,
            tag: tag,
            identifier: identifier,
            content: content,
          }.merge(extra))
        end
      end
    end
  end
end
