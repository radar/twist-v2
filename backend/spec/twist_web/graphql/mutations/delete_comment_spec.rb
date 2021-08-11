require 'spec_helper'

module Twist
  describe Web::GraphQL::Runner do
    context 'deleteComment mutation' do
      let(:comment_repo) { double(Repositories::CommentRepo) }

      subject do
        described_class.new(
          repos: {
            comment: comment_repo,
          },
        )
      end

      let(:comment) do
        double(Entities::Comment, id: 1, user_id: 1, text: "Hello World")
      end

      before do
        allow(comment_repo).to receive(:find) { comment }
      end

      context "when signed as the comment's owner" do
        let(:current_user) { double(Entities::User, id: 1) }
        it "deletes the comment" do
          query = %|
            mutation {
              deleteComment(id: "1") {
                id
              }
            }
          |

          expect(comment_repo).to receive(:delete) { comment }

          result = subject.run(
            query: query,
            context: { current_user: current_user },
          )
          comment = result.dig("data", "deleteComment")
          expect(comment["id"]).to eq("1")
        end
      end

      context "when signed as someone else" do
        let(:current_user) { double(Entities::User, id: 2) }
        it "does not delete the comment" do
          query = %|
            mutation {
              deleteComment(id: "1") {
                id
              }
            }
          |

          expect(comment_repo).not_to receive(:delete)

          result = subject.run(
            query: query,
            context: { current_user: current_user },
          )
          comment = result.dig("data", "deleteComment")
          expect(comment["id"]).to eq("1")
        end
      end
    end
  end
end
