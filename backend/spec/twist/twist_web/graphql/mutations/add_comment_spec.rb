require 'spec_helper'

module Twist
  describe Web::GraphQL::Runner do
    context 'addComment mutation' do
      let(:current_user) { double(User, id: 1) }
      let(:comment_repo) { double(Repositories::CommentRepo) }

      subject do
        described_class.new(
          repos: {
            comment: comment_repo,
          },
        )
      end

      it "adds a comment" do
        query = %|
          mutation {
            addComment(noteId: "1", text: "Hello World") {
              id
              text
            }
          }
        |

        expect(comment_repo).to receive(:create) do
          double(Comment, id: 1, text: "Hello World")
        end

        result = subject.run(
          query: query,
          context: { current_user: current_user },
        )
        comment = result.dig("data", "addComment")
        expect(comment["id"]).to eq("1")
        expect(comment["text"]).to eq("Hello World")
      end
    end
  end
end
