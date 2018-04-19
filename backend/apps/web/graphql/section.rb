module Web
  module GraphQL
    SectionType = ::GraphQL::ObjectType.define do
      name "Section"
      description "A section"

      field :id, !types.ID
      field :title, !types.String
      field :link, !types.String
      field :subsections, types[SectionType]
    end
  end
end
