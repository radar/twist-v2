require 'sidekiq'
require_relative 'markdown_book'
require_relative 'markdown_chapter_processor'

module Twist
  class MarkdownBookWorker
    include Sidekiq::Worker

    # rubocop:disable Metrics/AbcSize
    # rubocop:disable Metrics/MethodLength
    def perform(args)
      permalink = args["permalink"]
      branch_name = args["branch"]
      username, repo = args["github_path"].split("/")
      book = find_book(permalink)
      branch = find_branch(book, branch_name)

      git = Git.new(
        username: username,
        repo: repo,
        branch: branch_name,
      )

      latest_commit = git.fetch!
      commit = find_and_clean_or_create_commit(branch.id, latest_commit.oid)

      markdown_book = MarkdownBook.new(git.local_path)
      manifest = markdown_book.process_manifest
      manifest.each do |part, file_names|
        file_names.each_with_index do |file_name, position|
          MarkdownChapterProcessor.new(commit, git.local_path, file_name, part, position).process
        end
      end
    end
    # rubocop:enable Metrics/MethodLength
    # rubocop:enable Metrics/AbcSize

    private

    def find_book(permalink)
      repo = Repositories::BookRepo.new
      book = repo.find_by_permalink(permalink)
      raise "Book (#{permalink}) not found" unless book

      book
    end

    def find_branch(book, branch)
      repo = Repositories::BranchRepo.new
      branch = repo.find_by_book_id_and_name(book.id, branch)
      branch = raise "Branch (#{branch_name}) not found" unless book
      branch
    end

    def find_and_clean_or_create_commit(branch_id, commit)
      repo = Repositories::CommitRepo.new
      repo.find_and_clean_or_create(branch_id, commit, Repositories::ChapterRepo.new)
    end
  end
end
