# rubocop:disable Metrics/ClassLength
require 'bugsnag'

module Twist
  module Markdown
    class ElementProcessor
      def initialize(chapter, book_path)
        @chapter = chapter
        @book_path = book_path
      end

      def process!(markup)
        send("process_#{markup.name}!", markup)
      end

      private

      attr_reader :chapter, :book_path

      def element_repo
        @element_repo ||= Repositories::ElementRepo.new
      end

      def image_repo
        @image_repo ||= Repositories::ImageRepo.new
      end

      def create_element(markup, name, extra = {})
        element_repo.create({
          chapter_id: chapter.id,
          tag: name,
          content: markup,
        }.merge(extra))
      end

      def process_p!(markup)
        if markup.css('img').any?
          # TODO: can Markdown really contain multiple images in the same p tag?
          markup.css('img').each do |img|
            image = process_img!(img)
            if image
              create_element(img.to_html, "img", identifier: img['src'], image_id: image.id)
            end
          end
        else
          create_element(markup.to_html, "p")
        end
      end

      # rubocop:disable Metrics/AbcSize
      def process_img!(markup)
        # First, check to see if file is within book directory
        # This stops illegal access to files outside this directory
        image_path = File.expand_path(File.join(book_path, markup['src']))
        files = Dir[File.expand_path(File.join(book_path, "**", "*"))]
        unless files.include?(image_path)
          warning = "Missing image in #{chapter.title}: #{image_path}"
          Bugsnag.notify(warning)
          # Ignore it
          return
        end

        filename = markup['src']
        image_repo.find_or_create_image(chapter.id, filename, image_path, markup['alt'])
      end
      # rubocop:enable Metrics/AbcSize

      def process_div!(markup)
        # Divs have classes to identify them, separate them and process them as we see fit
        method = "process_#{markup['class']}!"
        send(method, markup) if respond_to?(method, true)
      end

      def process_ul!(markup)
        create_element(markup.to_html, "ul")
      end

      def process_ol!(markup)
        create_element(markup.to_html, "ol")
      end

      def process_table!(markup)
        create_element(markup.to_html, "table")
      end

      def process_note!(markup)
        create_element(markup.to_html, "note")
      end

      def process_warning!(markup)
        create_element(markup.to_html, "warning")
      end

      def process_tip!(markup)
        create_element(markup.to_html, "tip")
      end

      def process_code!(markup)
        create_element(markup.to_html, "code")
      end

      def process_aside!(markup)
        create_element(markup.to_html, "warning")
      end

      def process_footnote!(markup)
        create_element(markup.to_html, "footnote")
      end

      def process_blockquote!(markup)
        create_element(markup.to_html, "blockquote")
      end

      def process_hr!(_markup)
        create_element(nil, "hr")
      end

      def process_header!(_markup)
        # headers are processed separately, we don't care about them in this context
      end

      def process_h1!(_markup)
        # Already processed as the chapter title
      end

      def new_id(markup)
        markup.text.to_slug.normalize.to_s
      end

      def process_h2!(markup)
        markup["id"] = new_id(markup)
        create_element(markup.to_html, "h2", identifier: markup["id"])
      end

      def process_h3!(markup)
        markup["id"] = new_id(markup)
        create_element(markup.to_html, "h3", identifier: markup["id"])
      end

      def process_h4!(markup)
        create_element(markup.to_html, "h4")
      end

      def process_h5!(markup)
        create_element(markup.to_html, "h5")
      end

      def process_h6!(markup)
        create_element(markup.to_html, "h6")
      end

      def process_text!(markup)
        # We don't care about orphaned text, only text within an element such as a paragraph.
      end
    end
    # rubocop:enable Metrics/ClassLength
  end
end
