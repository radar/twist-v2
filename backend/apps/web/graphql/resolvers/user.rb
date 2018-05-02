require 'jwt'

module Web
  module GraphQL
    module Resolvers
      module User
        class ByID
          def call(note, _args, ctx)
            ctx[:user_loader].load(note.user_id)
          end
        end
      end
    end
  end
end
