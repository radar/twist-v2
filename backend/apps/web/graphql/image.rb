module Web
  module GraphQL
    ImageType = ::GraphQL::ObjectType.define do
      name "Image"
      description "An image"

      field :id, types.ID
      field :path, !types.String do
        resolve ->(image, _args, _ctx) { image.image.url }
      end
    end
  end
end
