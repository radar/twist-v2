require 'fileutils'
require 'pathname'

require_relative 'chapter'

module Twist
  module Asciidoc
    class BookWorker
      include Sidekiq::Worker

      include Import['repositories.book_repo']

      def perform(args)
        username, repo = args["github_path"].split("/")
        book_updater = BookUpdater.new(
          permalink: args["permalink"],
          branch: args["branch"],
          username: username,
          repo: repo,
        )

        git, commit = book_updater.update!

        book = find_book(args["permalink"])

        path = htmlify_book(git.local_path, username, repo)

        chapter_elements = Nokogiri::HTML.parse(File.read(path)).css(".sect1")
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
        book_file_candidates = [path + "book.ad", path + "book.adoc"]
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
