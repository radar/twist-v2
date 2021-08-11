require 'spec_helper'

module Twist
  describe Web::GraphQL::Runner do
    context 'branches' do
      let(:current_user) { double(Entities::User, id: 1) }
      let(:book_repo) { double(Repositories::BookRepo) }
      let(:branch_repo) { double(Repositories::BranchRepo) }
      let(:commit_repo) { double(Repositories::CommitRepo) }
      let(:permission_repo) { double(Repositories::PermissionRepo) }
      let(:book) do
        Twist::Entities::Book.new(
          id: 1,
          title: "Exploding Rails",
          permalink: "exploding-rails",
        )
      end

      let(:branch) do
        Twist::Entities::Branch.new(
          id: 1,
          name: "master",
          default: true
        )
      end

      let(:commit) do
        double(Twist::Entities::Commit,
          id: 1,
          sha: "abc123",
          message: "initial commit",
          created_at: Time.now,
        )
      end

      let(:query) do
        %|
          query branchQuery($bookPermalink: String!, $name: String!) {
            book(permalink: $bookPermalink) {
              ... on PermissionDenied {
                error
              }

              ... on Book {
                title

                branch(name: $name) {
                  default
                  name

                  commits {
                    sha
                    message
                    createdAt
                  }
                }
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
            commit: commit_repo,
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
            variables: { bookPermalink: "exploding-rails", name: "master" },
            context: { current_user: current_user },
          )
          expect(result["data"]["book"]["error"]).not_to be_nil
        end
      end

      context "when user has permission to see the book" do
        before do
          allow(permission_repo).to receive(:user_authorized_for_book?) { true }
        end

        it "fetches the named branch and commits" do
          expect(branch_repo).to receive(:find_by_book_id_and_name) { branch }
          expect(commit_repo).to receive(:for_branch) { [commit] }
          result = subject.run(
            query: query,
            variables: { bookPermalink: "exploding-rails", name: "master" },
            context: { current_user: current_user },
          )

          branch = result.dig("data", "book", "branch")

          expect(branch["name"]).to eq("master")
          expect(branch["default"]).to eq(true)

          commit = branch["commits"].first

          expect(commit["sha"]).to eq("abc123")
          expect(commit["message"]).to eq("initial commit")
        end
      end
    end
  end
end
