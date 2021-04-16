require 'spec_helper'

module Twist
  describe Web::GraphQL::Runner, graphql: true do
    context 'book -> readers' do
      let(:current_user) { double(User, id: 1) }
      let(:book_repo) { instance_double(Repositories::BookRepo) }
      let(:reader_repo) { instance_double(Repositories::ReaderRepo) }
      let(:permission_repo) { instance_double(Repositories::PermissionRepo) }
      let(:book) do
        Twist::Book.new(
          id: 1,
          title: "Active Rails",
          permalink: "active-rails",
        )
      end

      let(:reader_1) do
        Twist::Reader.new(
          id: 1,
          github_login: "radar",
          name: "Ryan Bigg",
          permissions: [
            book_id: 1,
            user_id: 1,
            author: true,
          ]
        )
      end

      let(:reader_2) do
        Twist::Reader.new(
          id: 2,
          github_login: "twist",
          name: "Twist Books",
          permissions: [
            book_id: 1,
            user_id: 2,
            author: false,
          ]
        )
      end

      let(:reader_3) do
        Twist::Reader.new(
          id: 3,
          github_login: "sharon",
          name: "Sharon",
          permissions: [
            book_id: 1,
            user_id: 3,
            author: false,
          ]
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
                  id
                  author
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
            reader: reader_repo,
          }
        )
      end

      before do
        expect(permission_repo).to receive(:user_authorized_for_book?) { true }
        expect(book_repo).to receive(:find_by_permalink).with("active-rails") { book }
        expect(reader_repo).to receive(:by_book).with(1) { [reader_1, reader_2] }
      end

      let(:variables) do
        { permalink: "active-rails" }
      end

      let(:context) do
        { current_user: current_user }
      end

      it "fetches the readers for the book" do
        result = run_query!

        readers = result.dig("data", "book", "readers")
        expect(readers.count).to eq(2)
        expect(readers.map { |reader| reader["id"] }).not_to include(reader_3.id)

        reader_1_json = readers.find { |reader| reader["id"] == reader_1.id.to_s }

        expect(reader_1_json["githubLogin"]).to eq("radar")
        expect(reader_1_json["name"]).to eq("Ryan Bigg")
        expect(reader_1_json["author"]).to eq(true)

        reader_2_json = readers.find { |reader| reader["id"] == reader_2.id.to_s }

        expect(reader_2_json["githubLogin"]).to eq("twist")
        expect(reader_2_json["name"]).to eq("Twist Books")
        expect(reader_2_json["author"]).to eq(false)
      end
    end
  end
end
