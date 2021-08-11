module Twist
  module Web
    module Controllers
      module Books
        class Receive < Hanami::Action
          include Twist::Import[
            find_book: "transactions.books.find",
            find_or_create_branch: "transactions.branches.find_or_create"
          ]

          def handle(req, res)
            payload = JSON.parse(req.params[:payload])
            book = find_book.(permalink: req.params[:permalink])
            unless book
              res.status = 404
              res.body = JSON.generate(error: "Book not found")
              return
            end

            branch = find_or_create_branch.(book_id: book.id, ref: payload["ref"])
            worker = case book.format
                    when "markdown"
                      Twist::Processors::Markdown::BookWorker
                    when "asciidoc"
                      Twist::Processors::Asciidoc::BookWorker
                    else
                      raise "unknown format"
                    end
            username, repo = payload["repository"]["full_name"].split("/")

            worker.perform_async(
              permalink: book.permalink,
              branch: branch.name,
              username: username,
              repo: repo,
            )

            res.status = 200
            res.body = "OK"
          end

          private

          def verify_csrf_token?
            false
          end
        end
      end
    end
  end
end
