require 'features_helper'

RSpec.feature "Signing up", type: :feature do
  let(:user_repo) { UserRepository.new }
  before { user_repo.clear }

  scenario "successfully signing up" do
    visit "/users/sign_up"
    fill_in "Email", with: "test@example.com"
    fill_in "Password", with: "password"
    fill_in "Password confirmation", with: "password"
    click_button "Sign Up"

    expect(page).to have_content("You have signed up successfully.")
    expect(page).to have_content("You are signed in as test@example.com")
    expect(user_repo.find_by_email("test@example.com")).not_to be_nil
  end

  scenario "leaving email blank shows an error" do
    visit "/users/sign_up"
    fill_in "Email", with: ""
    fill_in "Password", with: "password"
    fill_in "Password confirmation", with: "password"
    click_button "Sign Up"

    expect(page).to have_content("We are having trouble signing you up.")
    expect(page).to have_content("Email must be filled")
    expect(user_repo.find_by_email("test@example.com")).to be_nil
  end

  scenario "shows an error when password + password confirmation do not match" do
    visit "/users/sign_up"
    fill_in "Email", with: ""
    fill_in "Password", with: "password"
    fill_in "Password confirmation", with: "not-password"
    click_button "Sign Up"

    expect(page).to have_content("We are having trouble signing you up.")
    expect(page).to have_content("Password did not match password confirmation")
    expect(user_repo.find_by_email("test@example.com")).to be_nil
  end
end
