require 'fileutils'
require 'pathname'

require_relative 'chapter'

module Twist
  module Processors
    module Asciidoc
      class BookWorker
        include Sidekiq::Worker

        include Import['repositories.book_repo']

        class WorkerParams < Dry::Struct
          transform_keys(&:to_sym)

          attribute :username, "string"
          attribute :repo, "string"
          attribute :permalink, "string"
          attribute :branch, "string"
        end

        def perform(args)

          worker_params = WorkerParams.new(args)
          username = worker_params.username
          repo = worker_params.repo

          book_updater = BookUpdater.new(
            permalink: worker_params.permalink,
            branch: worker_params.branch,
            username: username,
            repo: repo,
          )

          git, commit = book_updater.update!

          book = find_book(worker_params.permalink)

          path = htmlify_book(git.local_path, username, repo)
          content = Nokogiri::HTML.parse(File.read(path))

          footnote_elements = content.css("#footnotes .footnote")
          footnote_elements.each do |footnote_element|
            Footnote.new(element: footnote_element, commit: commit).process
          end

          chapter_elements = content.css(".sect1")
          chapter_elements.each_with_index do |chapter_element, index|
            Chapter.new(book, commit, git.local_path, chapter_element, index + 1).process
          end
        end

        private

        def find_book(permalink)
          book = book_repo.find_by_permalink(permalink)
          raise "Book (#{permalink}) not found" unless book

          book
        end

        def htmlify_book(path, username, repo)
          book_file_candidates = [path + "book-highlights.ad", path + "book-highlights.adoc", path + "book.ad", path + "book.adoc"]
          book_file = book_file_candidates.detect { |file| File.exist?(file) }

          unless book_file
            raise "Couldn't find book.ad or book.adoc at root of repository."
          end

          output_dir = Twist::Container.root + "tmp/#{username}/#{repo}"
          FileUtils.rm_rf(output_dir)
          FileUtils.mkdir_p(output_dir)
          html_file = output_dir + "book.html"
          `asciidoctor -b html #{book_file} -o #{html_file}`
          html_file
        end
      end
    end
  end
end
