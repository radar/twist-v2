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
        },
      }
    end

    before { fake_sign_in(user) }

    it 'creates a book with a permalink' do
      book_repo = double(BookRepository)
      allow(subject).to receive(:book_repo) { book_repo }
      expect(book_repo).to receive(:create).with(
        title: "Markdown Book Test",
        source: "GitHub",
        permalink: "markdown-book-test",
      ).and_return(double(Book, permalink: "markdown-book-test"))

      subject.call(params)
    end

    it 'redirects to setup webhook' do
      _status, headers, = subject.call(params)

      expect(headers["Location"]).to include("setup_webhook")
    end
  end
end
