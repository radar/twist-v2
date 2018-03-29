require_relative '../../../spec_helper'

describe Web::Controllers::Books::Create do
  let(:params) { {} }
  include_examples "requires authentication"

  context 'when user is signed in', uses_authentication: true do
    let(:user) { User.new(id: 1, email: "test@example.com") }
    let(:params) do
      {
        book: {
          title: "Markdown Book Test",
          source: "GitHub",
          format: "markdown",
          default_branch: "master",
        },
      }
    end

    before { fake_sign_in(user) }

    it 'creates a book with a permalink' do
      _status, headers, = subject.(params)
      expect(headers["Location"]).to eq("/books/markdown-book-test/setup_webhook")
    end

    it 'redirects to setup webhook' do
      _status, headers, = subject.(params)

      expect(headers["Location"]).to include("setup_webhook")
    end
  end
end
