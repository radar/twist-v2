require 'spec_helper'

module Twist
  describe Web::GraphQL::Runner do
    context 'book -> readers' do
      let(:current_user) { double(User, id: 1) }
      let(:book_repo) { instance_double(Repositories::BookRepo) }
      let(:user_repo) { instance_double(Repositories::UserRepo) }
      let(:permission_repo) { instance_double(Repositories::PermissionRepo) }
      let(:book) do
        Twist::Book.new(
          id: 1,
          title: "Active Rails",
          permalink: "active-rails",
        )
      end

      let(:user_1) do
        Twist::User.new(
          id: 1,
          github_login: "radar",
          name: "Ryan Bigg",
        )
      end

      let(:user_2) do
        Twist::User.new(
          id: 2,
          github_login: "twist",
          name: "Twist Books",
        )
      end

      let(:query) do
        %|
          query readers($permalink: String!) {
            book(permalink: $permalink) {
              ... on PermissionDenied {
                error
              }

              ... on Book {
                readers {
                  githubLogin
                  name
                }
              }
            }
          }
        |
      end

      subject do
        described_class.new(
          repos: {
            permission: permission_repo,
            book: book_repo,
            user: user_repo,
          }
        )
      end

      before do
        expect(permission_repo).to receive(:user_authorized_for_book?) { true }
        expect(book_repo).to receive(:find_by_permalink).with("active-rails") { book }
        expect(user_repo).to receive(:by_book).with(1) { [user_1] }
      end

      it "fetches the readers for the book" do
        result = subject.run(
          query: query,
          variables: { permalink: "active-rails" },
          context: { current_user: current_user },
        )

        readers = result.dig("data", "book", "readers")
        expect(readers.count).to eq(1)

        expect(readers.first["githubLogin"]).to eq("radar")
        expect(readers.first["name"]).to eq("Ryan Bigg")
      end
    end
  end
end
