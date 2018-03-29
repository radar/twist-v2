require "features_helper"

RSpec.feature "Signing out" do
  context "when signed in", warden: true do
    let(:user) { UserRepository.new.create(email: "test@example.com") }
    before { login_as(user) }

    it "signs out successfully" do
      visit "/"
      expect(page).to have_content("Sign out (test@example.com)")
      click_link "Sign out"
      expect(page).to have_content("You have now signed out.")
      expect(page.current_path).to eq("/users/sign_in")
    end
  end
end
