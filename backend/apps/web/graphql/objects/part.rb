module Web
  module GraphQL
    class PartType < ::GraphQL::Schema::Enum
      graphql_name "BookParts"
      description "Parts of the book"
      value "FRONTMATTER", "The front of the book, introductions, prefaces, etc."
      value "MAINMATTER", "The main content of the book"
      value "BACKMATTER", "The back of the book, appendixes, etc."
    end
  end
end
