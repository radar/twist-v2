module Books
  module GraphQL
    module Resolvers
      module Section
        class ByChapter
          def call(chapter, _args, _ctx)
            element_repo = ElementRepository.new
            headers = element_repo.sections_for_chapter(chapter.id)

            hierarchy = []
            current_section = { subsections: [] }

            headers.each do |header|
              case header.tag
              when "h2"
                current_section = build_section(header, true)
                hierarchy << current_section
              when "h3"
                current_section[:subsections] << build_section(header, false)
              end
            end

            hierarchy.map! do |item|
              item[:subsections].map! do |subitem|
                ::Section.new(subitem)
              end

              ::Section.new(item)
            end

            hierarchy
          end

          private

          def build_section(element, subsections=false)
            title = extract_text(element.content)

            section = {
              id: element.id,
              tag: element.tag,
              title: title,
              link: slugify(title),
            }

            section.merge!(subsections: []) if subsections

            section
          end

          def extract_text(content)
            Nokogiri::HTML.fragment(content).text
          end

          def slugify(title)
            title.to_slug.normalize.to_s
          end
        end
      end
    end
  end
end
