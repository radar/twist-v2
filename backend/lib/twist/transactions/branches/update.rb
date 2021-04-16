module Twist
  module Transactions
    module Branches
      class Update < Transaction
        include Import["repositories.branch_repo"]
        include Import[
          find_book: "transactions.books.find",
          find_or_create_branch: "transactions.branches.find_or_create"
        ]

        def call(book_permalink:, branch_name:, current_user:)
          book = find_book.(permalink: book_permalink)
          branch = find_or_create_branch.(book_id: book.id, ref: branch_name)

          worker = case book.format
                  when "markdown"
                    Twist::Markdown::BookWorker
                  when "asciidoc"
                    Twist::Asciidoc::BookWorker
                  else
                    raise "unknown format"
                  end

          puts "Enqueuing work on book"

          worker.perform_async(
            permalink: book.permalink,
            branch: branch.name,
            username: book.github_user,
            repo: book.github_repo,
          )

          Success(branch)
        end
      end
    end
  end
end
