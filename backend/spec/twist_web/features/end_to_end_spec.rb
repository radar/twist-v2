require 'features_helper'

RSpec.describe "Submit Note", type: :feature do
  let(:create_book) { Twist::Transactions::Books::Create.new }
  let(:create_user) { Twist::Transactions::Users::Create.new }
  let(:grant_permission) { Twist::Transactions::Permissions::Grant.new }
  before do
    create_user.(
      email: "me@ryanbigg.com",
      password: "password",
      name: "Ryan Bigg",
    )

    book = create_book.(
      github_user: "radar",
      github_repo: "asciidoc_book_test",
      title: "Asciidoc Book Test",
      blurb: "Testing for asciidoc books",
      default_branch: "master",
    ).success

    Twist::Asciidoc::BookWorker.perform_async(
      permalink: book.permalink,
      branch: "master",
      github_path: "radar/asciidoc_book_test",
    )
  end

  it "can test note submission, opening + closing, and comment submission" do
    visit "/"

    click_link "Asciidoc Book Test"
    within("h1") do
      expect(page).to have_content("Asciidoc Book Test")
    end
    click_link "Preface / Introduction"
    first(:link, text: "0 notes +").click
    fill_in "Leave a note", with: "Blah Blah Blah"
    click_button "Submit Note"

    click_link "Asciidoc Book Test"
    click_link "Notes for this book"

    within(".note") do
      expect(page).to have_content("Blah Blah Blah")
    end

    click_button "Close"
    expect(page).not_to have_selector(:button, "Close", exact: true)

    click_button "Open"
    expect(page).not_to have_selector(:button, "Open", exact: true)

    fill_in "Leave a comment", with: "I am writing a comment on this note"
    click_button "Comment"

    comment = first("[data-test-class=comment]")
    within(comment) do
      expect(page).to have_content("I am writing a comment on this note")
    end

    binding.pry
  end
end
