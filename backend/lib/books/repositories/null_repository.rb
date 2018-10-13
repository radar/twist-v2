class NullRepository
  attr_reader :name

  def initialize(name)
    @name = name
  end

  def method_missing(method, *args)
    raise "#{method} called on NullRepository (placeholder for #{name} repository)"
  end
end
