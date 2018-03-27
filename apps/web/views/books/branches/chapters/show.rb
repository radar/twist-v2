module Web
  module Views
    module Books
      module Branches
        module Chapters
          class Show
            include Web::View

            def render_elements(chapter)
              _raw(chapter.elements.map(&:content).join("\n"))
            end
          end
        end
      end
    end
  end
end
