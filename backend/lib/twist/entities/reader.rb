module Twist
  class Reader < ROM::Struct
    attribute :id, Types::Integer
    attribute :github_login, Types::String
    attribute :name, Types::String
    attribute :permissions, Types::Array.of(Permission)

    def author_for?(book_id)
      permissions.any? do |permission|
        permission.book_id == book_id && permission.author
      end
    end
  end
end
