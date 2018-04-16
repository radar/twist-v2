require 'babosa'
require 'json'

sections = [
  ["h2", "Installing ROM"],
  ["h3", "Generating our first ROM-powered relation, repository, model and migration"],
  ["h2", "Connecting a Rails Controller with ROM"],
  ["h2", "Showing a particular project"],
  ["h2", "Validating projects during creation"],
  ["h3", "A small interlude about that contributors method"]
]

hierarchy = []
# heirarchy = [
#   {
#     id: 1,
#     name: 'Installing ROM',
#     subsections: [
#       {
#         id: 2,
#         name: 'Generating our first...'
#       }
#     ]
#   }
# ]

current_section = nil

sections.each do |tag, title|
  case tag
  when "h2"
    current_section = {tag: tag, title: title, subsections: []}
    hierarchy << current_section
  when "h3"
    current_section[:subsections] << {tag: tag, title: title}
  end
end

puts hierarchy.to_json

