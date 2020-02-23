module Twist
  class Repository < ROM::Repository::Root
    struct_namespace ::Twist

    def self.new
      super(Twist::Container["database"])
    end
  end
end
