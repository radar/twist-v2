module Twist
  class NullRepository
    attr_reader :name

    def initialize(name)
      @name = name
    end

    # rubocop:disable Style/MethodMissingSuper
    def method_missing(method, *_args)
      raise "#{method} called on NullRepository (placeholder for #{name} repository)"
    end
    # rubocop:enable Style/MethodMissingSuper

    def respond_to_missing?(_method, *)
      true
    end
  end
end
