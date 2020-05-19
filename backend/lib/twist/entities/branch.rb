module Twist
  class Branch < ROM::Struct
    attribute :id, 'integer'
    attribute :name, 'string'
    attribute :default, 'bool'

  end
end
