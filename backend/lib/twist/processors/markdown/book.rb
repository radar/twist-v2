require 'pathname'

module Twist
  module Processors
    module Markdown
      class Book
        def initialize(path)
          @path = path
        end

        # rubocop:disable Metrics/MethodLength
        def process_manifest
          lines = File.readlines(Pathname.new(path) + "manuscript/Book.txt")
          parts = Hash.new { |h, k| h[k] = [] }
          part = :mainmatter
          lines.each do |line|
            case line
            when /frontmatter/
              part = 'frontmatter'
            when /mainmatter/
              part = 'mainmatter'
            when /backmatter/
              part = 'backmatter'
            else
              next if line.strip == ""

              parts[part] << line.strip
            end
          end

          parts
        end
        # rubocop:enable Metrics/MethodLength

        private

        attr_reader :path
      end
    end
  end
end
