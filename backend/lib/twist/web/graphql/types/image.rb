module Twist
  module Web
    module GraphQL
      module Types
        class Image < ::GraphQL::Schema::Object
          graphql_name "Image"
          description "An image"

          field :id, ID, null: false
          field :path, String, null: false
          field :caption, String, null: true

          def path
            return '/images/image_processing.png' if object.status == 'processing'

            return object.image.url if object.image.url

            '/images/image_missing.png'
          end
        end
      end
    end
  end
end
