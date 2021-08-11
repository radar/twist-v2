module Twist
  module Web
    module GraphQL
      module Types
        class Note < ::GraphQL::Schema::Object
          graphql_name "Note"
          description "A note"

          field :id, ID, null: false
          field :number, Integer, null: false
          field :created_at, String, null: false
          field :state, String, null: false
          field :text, String, null: false
          field :user, Types::User, null: false

          field :element, Types::Element, null: false
          field :comments, [Types::Comment], null: false

          def created_at
            object.created_at.iso8601
          end

          def user
            context[:user_loader].load(object.user_id)
          end

          def element
            context[:element_loader].load(object.element_id)
          end

          def comments
            context[:comment_repo].by_note_id(object.id)
          end
        end
      end
    end
  end
end
