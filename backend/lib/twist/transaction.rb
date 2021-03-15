module Twist
  class Transaction
    def self.inherited(base)
      base.include Dry::Monads[:result]
      base.include Dry::Monads::Do.for(:call)
    end

    def self.call(**args)
      new.call(**args)
    end

    def permission_denied!
      Failure("You must be an author to do that.")
    end
  end
end
