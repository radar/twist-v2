module Twist
  class Repository < ROM::Repository::Root
    struct_namespace ::Twist::Entities

    include Import[container: "database"]
  end
end
