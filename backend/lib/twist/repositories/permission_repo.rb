module Twist
  module Repositories
    class PermissionRepo < Twist::Repository[:permissions]
      commands :create

      def find_by_book_id_and_user_id(book_id, user_id)
        permissions.where(book_id: book_id, user_id: user_id).first
      end

      def user_authorized_for_book?(user, book)
        return true if ENV['BYPASS_PERMISSIONS']
        permissions.where(
          user_id: user.id,
          book_id: book.id,
        ).exist?
      end
    end
  end
end
