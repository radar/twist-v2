require_relative '../../spec_helper'

module Twist
  module Repositories
    describe ReaderRepo do
      let(:book_repo) { BookRepo.new }
      let(:permission_repo) { PermissionRepo.new }
      let(:user_repo) { UserRepo.new }

      let!(:book) { book_repo.create(title: "Markdown Book Test") }
      let!(:user) { user_repo.create(name: "Radar", github_login: "radar") }
      let!(:permission) { permission_repo.create(book_id: book.id, user_id: user.id, author: true) }

      context "by_book" do
        it "gets author information for a book" do
          readers = subject.by_book(book.id)

          expect(readers.first).to be_a(Twist::Entities::Reader)
          expect(readers.first.permissions).not_to be_nil
        end
      end
    end
  end
end
