task add_book: :environment do
  create_book = Web::Transactions::Books::Create.new
  create_book.(
    title: "Exploding Rails",
    source: "GitHub",
    format: "markdown",
    default_branch: "master",
  )
end
