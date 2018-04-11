require_relative 'chapter'
require_relative 'part'

require_relative 'resolvers/chapter'

module Books
  module GraphQL
    BranchType = ::GraphQL::ObjectType.define do
      name "Branch"
      description "A branch"

      field :id, types.ID
      field :name, !types.String
      field :default, !types.Boolean
      field :chapters, types[ChapterType] do
        argument :part, !PartType

        resolve Resolvers::Chapter::ByPart.new
      end

      field :chapter, ChapterType do
        argument :permalink, !types.String

        resolve Resolvers::Chapter::ByPermalink.new
      end
    end
  end
end
