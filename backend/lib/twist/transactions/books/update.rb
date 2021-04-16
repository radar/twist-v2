module Twist
  module Transactions
    module Books
      class Update < Transaction
        def call(book:, ref:)
          branch = yield find_branch(book, ref)
          worker = case book.format
          when "markdown"
            Twist::Markdown::BookWorker
          when "asciidoc"
            Twist::Asciidoc::BookWorker
          else
            raise "unknown format"
          end

          worker.perform_async(
            permalink: book.permalink,
            branch: branch.name,
            github_path: "#{book.github_user}/#{book.github_repo}",
          )
        end
      end
    end
  end
end
