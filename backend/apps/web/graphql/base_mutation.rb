module Web
  module GraphQL
    module Mutations
      # This class is used as a parent for all mutations, and it is the place to have common utilities
      class BaseMutation < ::GraphQL::Schema::Mutation
        null false
      end
    end
  end
end
