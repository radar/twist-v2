task seed: :environment do
  create_user = Web::Transactions::Users::Create.new
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

  create_book = Web::Transactions::Books::Create.new
  create_book.(
    title: "Markdown Book Test",
    source: "GitHub",
    format: "markdown",
    default_branch: "master",
    blurb: "This is a test of the Twist book review system.",
  ) do |result|
    result.success do |book|
      MarkdownBookWorker.perform_async(
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
end
