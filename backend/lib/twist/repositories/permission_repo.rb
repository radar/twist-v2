module Twist
  module Repositories
    class PermissionRepo < Twist::Repository[:permissions]
      commands :create

      def find_by_book_id_and_user_id(book_id:, user_id:)
        for_book_and_user(book_id: book_id, user_id: user_id).first
      end

      def find_or_create_by_book_id_and_user_id(book_id:, user_id:)
        args = { book_id: book_id, user_id: user_id }
        find_by_book_id_and_user_id(**args) || create(**args)
      end

      def make_author(book_id:, user_id:)
        find_or_create_by_book_id_and_user_id(book_id: book_id, user_id: user_id)
        for_book_and_user(book_id: book_id, user_id: user_id).update(author: true)
      end

      def author?(book_id:, user_id:)
        permission = find_by_book_id_and_user_id(book_id: book_id, user_id: user_id)
        return false unless permission
        permission.author
      end

      def for_book_and_user(book_id:, user_id:)
        permissions.where(book_id: book_id, user_id: user_id)
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
