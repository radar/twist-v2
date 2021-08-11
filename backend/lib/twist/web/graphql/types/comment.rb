module Twist
  module Web
    module GraphQL
      module Types
        class Comment < ::GraphQL::Schema::Object
          graphql_name "Comment"
          description "A comment"

          field :id, ID, null: false
          field :created_at, String, null: false
          field :text, String, null: false
          field :user, Types::User, null: false

          def created_at
            object.created_at.iso8601
          end

          def user
            context[:user_loader].load(object.user_id)
          end
        end
      end
    end
  end
end
