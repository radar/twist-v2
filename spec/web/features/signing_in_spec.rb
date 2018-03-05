require 'features_helper'

RSpec.feature "Signing in", type: :feature do
  before do
    UserRepository.new.clear

    Web::Transactions::CreateUser.new.call(
      email: "test@example.com",
      password: "password",
      password_confirmation: "password"
    )
  end

  scenario "successfully signing in" do
    visit "/users/sign_in"
    fill_in "Email", with: "test@example.com"
    fill_in "Password", with: "password"
    click_button "Sign In"

    expect(page).to have_content("You have signed in successfully.")
    expect(page).to have_content("You are signed in as test@example.com")
  end

  scenario "cannot sign in with the wrong email" do
    visit "/users/sign_in"
    fill_in "Email", with: "not-test@not-example.com"
    fill_in "Password", with: "password"
    click_button "Sign In"

    expect(page).to have_content("Invalid email or password.")
    expect(page).to have_content("Sign in")
  end
end
