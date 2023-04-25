desc "Seed any environment"
namespace :db do
  task seed: :environment do
    create_user = Twist::Transactions::Users::Create.new
    create_user.(
      email: "me@ryanbigg.com",
      password: "password",
      name: "Ryan Bigg",
    ) do |result|
      result.success do
        puts "User me@ryanbigg.com created."
      end

      result.failure do
        puts "User could not be created."
        exit(1)
      end

    end

    create_book = Twist::Transactions::Books::Create.new
    create_book.(
      title: "Markdown Book Test",
      source: "GitHub",
      format: "markdown",
      default_branch: "master",
      blurb: "This is a test of the Twist book review system.",
      github_user: "radar",
      github_repo: "markdown_book_test",
    ) do |result|
      result.success do |book|
        Twist::Processors::Markdown::BookWorker.perform_async(
          permalink: book.permalink,
          branch: "master",
          github_path: "radar/markdown_book_test",
        )
        puts "Book Markdown Book Test created and enqueued."
      end

      result.failure do
        puts "Book could not be created."
        exit(1)
      end
    end

    create_book = Twist::Transactions::Books::Create.new
    create_book.(
      title: "Asciidoc Book Test",
      source: "GitHub",
      format: "asciidoc",
      default_branch: "master",
      blurb: "This is a test of the Twist book review system.",
      github_user: "radar",
      github_repo: "asciidoc_book_test",
    ) do |result|
      result.success do |book|
        Twist::Processors::Asciidoc::BookWorker.new.perform(
          permalink: book.permalink,
          branch: "master",
          username: "radar",
          repo: "asciidoc_book_test",
        )
        puts "Book Asciidoc Book Test created and enqueued."
      end

      result.failure do
        puts "Book could not be created."
        exit(1)
      end
    end
  end
end
