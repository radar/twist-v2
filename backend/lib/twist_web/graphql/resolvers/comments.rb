module Twist
  module Web
    module GraphQL
      module Resolvers
        class Comments < Resolver
          def call(note_id:)
            context[:comment_repo].by_note_id(note_id)
          end
        end
      end
    end
  end
end
