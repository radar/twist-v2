# In the beginning

This is a test of the markdown processing system.

![A test image goes here](images/chapter_1/1.png)

## This is a new section

And here's some text for that section.

Here's a code example:

{title=spec/features/accounts/sign_up_spec.rb,lang=ruby,line-numbers=on}
    require "rails_helper"

    feature "Accounts" do
      scenario "creating an account" do
        visit root_path
        click_link "Create a new account"
        fill_in "Name", with: "Test"
        click_button "Create Account"

        within(".flash_notice") do
          success_message = "Your account has been created."
          expect(page).to have_content(success_message)
        end
      end
    end
