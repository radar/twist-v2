module Twist
  class Section < Dry::Struct
    attribute :id, Types::Integer
    attribute :title, Types::String
    attribute :link, Types::String
    attribute :subsections, Types::Array.optional
  end
end
