module Twist
  class BookRepository < Twist::Repository[:books]
    commands :create, use: :timestamps, plugins_options: { timestamps: { timestamps: %i(created_at updated_at) } }

    def add_branch(book, data)
      branches
        .changeset(:create, data.merge(book_id: book.id))
        .map(:add_timestamps)
        .commit
    end

    # def create_with_branches(data, book_branches)
    #   transaction do
    #     book = create(data)
    #     book_branches.each do |branch|
    #       branches
    #         .changeset(:create, branch.merge(book_id: book.id))
    #         .map(:add_timestamps)
    #         .commit
    #     end

    #     book
    #   end
    # end

    def ordered_by_title_with_branches
      aggregate(:branches).map_to(Book).order { :title }.to_a
    end

    def find_by_permalink(permalink)
      books.where(permalink: permalink).limit(1).one!
    end
  end
end
