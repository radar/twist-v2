module Twist
  class Transaction
    def self.inherited(base)
      base.include Dry::Monads[:result]
      base.include Dry::Monads::Do.for(:call)
    end
  end
end
