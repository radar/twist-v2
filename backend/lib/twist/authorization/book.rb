module Twist
  module Authorization
    class Book
      attr_reader :book, :user

      include Import["repositories.permission_repo"]

      def initialize(book:, user:, permission_repo:)
        @book = book
        @user = user
        @permission_repo = permission_repo
      end

      def success?
        permission_repo.user_authorized_for_book?(user, book)
      end
    end
  end
end
