require_relative 'renderer'
require_relative 'element_processor'

module Twist
  module Processors
    module Markdown
      class ChapterProcessor
        def initialize(commit, path, file_name, part, position)
          @commit = commit
          @path = path + "manuscript"
          @part = part
          @file_name = file_name
          @position = position
        end

        def process
          html = to_html
          title = html.css("h1").text

          chapter = create_chapter(title)
          elements = html.css("body > *")
          element_processor = ElementProcessor.new(chapter, path)
          elements.each do |element|
            element_processor.process!(element)
          end

          chapter
        end

        private

        attr_reader :commit, :path, :part, :file_name, :position

        def create_chapter(title)
          repo = Repositories::ChapterRepo.new
          repo.create(
            commit_id: commit.id,
            title: title,
            part: part,
            position: position + 1,
            file_name: file_name,
            permalink: title.downcase.tr(" ", "-"),
          )
        end

        def to_html
          Nokogiri::HTML(MarkdownProcessor.process(File.read(File.join(path, file_name))))

        end
      end
    end
  end
end
