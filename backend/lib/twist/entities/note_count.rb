module Twist
  class NoteCount < Dry::Struct
    attribute :element_id, Types::Integer
    attribute :count, Types::Integer
  end
end
