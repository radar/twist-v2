module Twist
  module Entities
    class NoteCount < Dry::Struct
      attribute :element_id, Types::Integer
      attribute :count, Types::Integer
    end
  end
end
