module Twist
  class Permalinker
    def call(string)
      # uses Babosa to get the work done
      string.to_slug.normalize.to_s
    end

    private

    attr_reader :string
  end
end
