
module Twist
  module Web
    module GraphQL
      class FootnoteType < ::GraphQL::Schema::Object
        field :identifier, String, null: false
        field :content, String, null: false
      end
    end
  end
end
