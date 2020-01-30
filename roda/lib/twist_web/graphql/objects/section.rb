module Twist
  module Web
    module GraphQL
      class SectionType < ::GraphQL::Schema::Object
        graphql_name "Section"
        description "A section"

        field :id, ID, null: false
        field :title, String, null: false
        field :link, String, null: false
        field :subsections, [SectionType], null: true
      end
    end
  end
end
