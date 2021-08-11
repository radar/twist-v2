module Twist
  module Processors
    module Asciidoc
      class Footnote
        attr_reader :element, :commit

        include Import["repositories.footnote_repo"]

        def initialize(element:, commit:, **args)
          super(**args)
          @element = element
          @commit = commit
        end

        def process
          footnote_repo.find_or_create(
            identifier: element["id"],
            number: element.css("a").text.to_i,
            content: element.to_html,
            commit_id: commit.id,
          )
        end
      end
    end
  end
end
