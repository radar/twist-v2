require 'spec_helper'

module Twist
  describe Web::GraphQL::Runner do
    context 'updateComment mutation' do
      let(:comment_repo) { double(Repositories::CommentRepo) }

      subject do
        described_class.new(
          repos: {
            comment: comment_repo,
          },
        )
      end

      let(:comment) do
        double(Twist::Entities::Comment, id: 1, user_id: 1, text: "Hello World")
      end

      before do
        allow(comment_repo).to receive(:find) { comment }
      end

      context "when signed as the comment's owner" do
        let(:current_user) { double(Entities::User, id: 1) }
        it "updates the comment's text" do
          query = %|
            mutation {
              updateComment(id: "1", text: "Hello New World") {
                id
                text
              }
            }
          |

          expect(comment_repo).to receive(:update) do
            double(Entities::Comment, id: 1, text: "Hello New World")
          end

          result = subject.run(
            query: query,
            context: { current_user: current_user },
          )
          comment = result.dig("data", "updateComment")
          expect(comment["id"]).to eq("1")
          expect(comment["text"]).to eq("Hello New World")
        end
      end

      context "when signed as someone else" do
        let(:current_user) { double(Entities::User, id: 2) }
        it "does not change the comment's text" do
          query = %|
            mutation {
              updateComment(id: "1", text: "Hello New World") {
                id
                text
              }
            }
          |

          expect(comment_repo).not_to receive(:update)

          result = subject.run(
            query: query,
            context: { current_user: current_user },
          )
          comment = result.dig("data", "updateComment")
          expect(comment["id"]).to eq("1")
          expect(comment["text"]).to eq("Hello World")
        end
      end
    end
  end
end
