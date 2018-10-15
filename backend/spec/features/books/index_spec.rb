require 'features_helper'

RSpec.describe "Books", type: :feature do
  let(:create_book) { Web::Transactions::Books::Create.new }
  let(:create_user) { Web::Transactions::Users::Create.new }
  before do
    create_user.(
      email: "me@ryanbigg.com",
      password: "password"
    )

    create_book.(
      title: "Exploding Rails",
      default_branch: "master"
    )
  end

  it "can view some books" do
    visit "/"
    login(email: "me@ryanbigg.com", password: "password")

    click_link "Exploding Rails"
  end

  def login(email:, password:)
    puts page.html
    puts page.content
    fill_in "Email", with: email
    fill_in "Password", with: password
    click_button "Login"
  end

end
