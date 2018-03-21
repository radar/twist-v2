class MarkdownBookWorker
  include Sidekiq::Worker

  # rubocop:disable Metrics/AbcSize
  # rubocop:disable Metrics/MethodLength
  def perform(args)
    permalink = args["permalink"]
    branch_name = args["branch"]
    username, repo = args["github_path"].split("/")
    book = find_book(permalink)

    raise "Book (#{permalink}) not found" unless book

    branch = find_branch(book, branch_name)

    raise "Branch (#{branch_name}) not found" unless book

    git = Git.new(
      username: username,
      repo: repo,
      branch: branch_name,
    )

    git.fetch!

    markdown_book = MarkdownBook.new(git.local_path)
    manifest = markdown_book.process_manifest
    manifest.each do |part, file_names|
      file_names.each_with_index do |file_name, position|
        MarkdownChapterProcessor.new(branch, git.local_path, file_name, part, position).process
      end
    end
  end
  # rubocop:enable Metrics/MethodLength
  # rubocop:enable Metrics/AbcSize

  private

  def find_book(permalink)
    repo = BookRepository.new
    repo.find_by_permalink(permalink)
  end

  def find_branch(book, branch)
    repo = BranchRepository.new
    repo.find_by_book_id_and_name(book.id, branch)
  end
end
