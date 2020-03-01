module Twist
  module Asciidoc
    class Footnote
      attr_reader :element, :commit

      include Import["repositories.footnote_repo"]

      def initialize(element:, commit:, **args)
        super(args)
        @element = element
        @commit = commit
      end

      def process
        footnote_repo.find_or_create(
          identifier: element["id"],
          content: element.to_html,
          commit_id: commit.id,
        )
      end
    end
  end
end
