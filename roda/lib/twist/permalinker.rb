module Twist
  class Permalinker
    def initialize(string)
      @string = string
    end

    def permalink
      # uses Babosa to get the work done
      string.to_slug.normalize.to_s
    end

    private

    attr_reader :string
  end
end
