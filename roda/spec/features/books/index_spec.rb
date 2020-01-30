require 'features_helper'

RSpec.describe "Books", type: :feature do
  let(:create_book) { Twist::Transactions::Books::Create.new }
  let(:create_user) { Twist::Transactions::Users::Create.new }
  before do
    create_user.(
      email: "me@ryanbigg.com",
      password: "password",
    )

    create_book.(
      title: "Exploding Rails",
      blurb: "Explode your Rails applications!",
      default_branch: "master",
    )
  end

  it "can view some books" do
    visit "/"
    login(email: "me@ryanbigg.com", password: "password")

    click_link "Exploding Rails"
  end

  def login(email:, password:)
    fill_in "Email", with: email
    fill_in "Password", with: password
    click_button "Login"
  end
end
