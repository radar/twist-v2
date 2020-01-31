module Twist
  class Repository < ROM::Repository::Root
    def self.new
      super(Twist::Container["database"])
    end
  end
end
