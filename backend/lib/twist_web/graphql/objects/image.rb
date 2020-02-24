module Twist
  module Web
    module GraphQL
      class ImageType < ::GraphQL::Schema::Object
        graphql_name "Image"
        description "An image"

        field :id, ID, null: false
        field :path, String, null: false
        field :caption, String, null: true

        def path
          object.image.url
        end
      end
    end
  end
end
