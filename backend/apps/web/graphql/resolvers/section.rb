module Web
  module GraphQL
    module Resolvers
      module Section
        class ByChapter
          def call(element_repo, chapter_id)
            build_sections(build_hierarchy(element_repo, chapter_id))
          end

          private

          # rubocop:disable Metrics/MethodLength
          def build_hierarchy(element_repo, chapter_id)
            headers = element_repo.sections_for_chapter(chapter_id)

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

            hierarchy
          end
          # rubocop:enable Metrics/MethodLength

          def build_sections(hierarchy)
            hierarchy.map do |item|
              item[:subsections].map! do |subitem|
                ::Section.new(subitem)
              end

              ::Section.new(item)
            end
          end

          def build_section(element, subsections = false)
            title = extract_text(element.content)

            section = {
              id: element.id,
              tag: element.tag,
              title: title,
              link: slugify(title),
            }

            section[:subsections] = [] if subsections

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
