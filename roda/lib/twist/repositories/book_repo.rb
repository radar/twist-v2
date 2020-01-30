module Twist
  module Repositories
    class BookRepo < Twist::Repository[:books]
      commands :create, use: :timestamps, plugins_options: { timestamps: { timestamps: %i(created_at updated_at) } }

      def all
        books.to_a
      end

      def create_with_branches(book, branches)
        transaction do
          book = create(book)

          branches.each do |branch|
            add_branch(book, branch)
          end
        end
      end

      def add_branch(book, data)
        branches
          .changeset(:create, data.merge(book_id: book.id))
          .map(:add_timestamps)
          .commit
      end

      def ordered_by_title_with_branches
        aggregate(:branches).map_to(Book).order { :title }.to_a
      end

      def find_by_permalink(permalink)
        books.where(permalink: permalink).limit(1).one!
      end
    end
  end
end
