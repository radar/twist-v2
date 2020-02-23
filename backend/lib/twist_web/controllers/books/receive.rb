module Twist
  module Web
    module Controllers
      module Books
        class Receive
          include Hanami::Action

          def call(params)
            payload = JSON.parse(params[:payload])
            book = find_book(params[:permalink])
            unless book
              self.status = 404
              self.body = JSON.generate(error: "Book not found")
              return
            end

            branch = find_or_create_branch(book.id, payload["ref"])
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
              github_path: payload["repository"]["full_name"],
            )

            self.status = 200
            self.body = "OK"
          end

          private

          def verify_csrf_token?
            false
          end

          def find_book(permalink)
            repo = Repositories::BookRepo.new
            repo.find_by_permalink(permalink)
          end

          def find_or_create_branch(book_id, ref)
            branch = ref.split("/").last
            repo = Repositories::BranchRepo.new
            repo.find_or_create_by_book_id_and_name(book_id, branch)
          end
        end
      end
    end
  end
end
