require 'spec_helper'

module Twist
  describe Web::GraphQL::Runner, graphql: true do
    context 'branches' do
      let(:current_user) { double(Entities::User, id: 1) }
      let(:book_repo) { double(Repositories::BookRepo) }
      let(:branch_repo) { double(Repositories::BranchRepo) }
      let(:permission_repo) { double(Repositories::PermissionRepo) }
      let(:book) do
        exploding_rails
      end

      let(:branch) do
        Twist::Entities::Branch.new(
          id: 1,
          name: "master",
          default: true
        )
      end

      let(:query) do
        %|
          query branchesQuery($bookPermalink: String!) {
            book(permalink: $bookPermalink) {
              ... on Book {
                branches {
                  name
                  default
                }
              }
              ... on PermissionDenied {
                error
              }
            }
          }
        |
      end

      subject do
        described_class.new(
          repos: {
            book: book_repo,
            branch: branch_repo,
            permission: permission_repo,
          }
        )
      end

      before do
        expect(book_repo).to receive(:find_by_permalink) { book }
      end

      context "when user does not have permission to see the book" do
        before do
          allow(permission_repo).to receive(:user_authorized_for_book?) { false }
        end

        it "returns an error" do
          result = subject.run(
            query: query,
            variables: { bookPermalink: "exploding-rails" },
            context: { current_user: current_user },
          )
          expect(result["data"]["book"]["error"]).not_to be_nil
        end
      end

      context "when user has permission to see the book" do
        before do
          allow(permission_repo).to receive(:user_authorized_for_book?) { true }
        end

        it "fetches all the branches for a book" do
          expect(branch_repo).to receive(:by_book) { [branch] }
          result = subject.run(
            query: query,
            variables: { bookPermalink: "exploding-rails" },
            context: { current_user: current_user },
          )

          branches = result.dig("data", "book", "branches")
          branch = branches.first

          expect(branch["name"]).to eq("master")
          expect(branch["default"]).to eq(true)
        end
      end
    end
  end
end
