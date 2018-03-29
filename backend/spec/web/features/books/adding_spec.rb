require "features_helper"

RSpec.feature "Adding books" do
  context "from GitHub" do
    context "when signed in", warden: true do
      let(:user) { UserRepository.new.create(email: "test@example.com") }
      before { login_as(user) }

      before do
        visit "/"
        click_link "Add Book"
      end

      scenario "successfully adds a book" do
        fill_in "Title", with: "Markdown Book Test"
        click_button "Create"

        expect(page).to have_content("Book has been added.")
        expect(page).to have_content("Setup your webhook")
        expect(page).to have_content("markdown-book-test/receive")
      end

      scenario "cannot leave title blank"
    end

    context "when not signed in" do
      it "cannot visit the new book path" do
        visit "/books/new"
        expect(page).to have_content("You must be signed in to do that.")
        expect(page.current_path).to eq("/users/sign_in")
      end
    end
  end
end
