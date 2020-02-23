require_relative 'chapter_processor'

module Twist
  module Asciidoc
    class Chapter
      def initialize(commit, path, element, position)
        @commit = commit
        @path = path
        @element = element
        @position = position
      end

      def process
        title_without_number = title.gsub(/^\d+\.\s+/, '')
        repo = Repositories::ChapterRepo.new
        chapter = repo.create(
          commit_id: commit.id,
          title: title_without_number,
          part: part,
          position: position,
          permalink: title_without_number.to_slug.normalize.to_s,
        )
        ChapterProcessor.perform_async(chapter.permalink, element.to_s)
      end

      def part
        case title
        when /\A\d+/
          "mainmatter"
        when /\AAppendix/
          "backmatter"
        else
          "frontmatter"
        end
      end

      private

      attr_reader :book, :commit, :element, :position

      def title
        element.css("h2").first.text
      end
    end
  end
end
