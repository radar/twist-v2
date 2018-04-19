module Web
  module GraphQL
    PartType = ::GraphQL::EnumType.define do
      name "BookParts"
      description "Parts of the book"
      value "FRONTMATTER", "The front of the book, introductions, prefaces, etc."
      value "MAINMATTER", "The main content of the book"
      value "BACKMATTER", "The back of the book, appendixes, etc."
    end
  end
end
