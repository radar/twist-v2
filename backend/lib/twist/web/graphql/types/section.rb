module Twist
  module Web
    module GraphQL
      module Types
        class Section < ::GraphQL::Schema::Object
          graphql_name "Section"
          description "A section"

          field :id, ID, null: false
          field :title, String, null: false
          field :link, String, null: false
          field :subsections, [Types::Section], null: false
        end
      end
    end
  end
end
