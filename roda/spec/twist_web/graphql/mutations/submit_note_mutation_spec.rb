require 'spec_helper'

module Twist
  describe Web::GraphQL::Runner do
    context 'submitNote mutation' do
      let(:current_user) { double(User, id: 1) }
      let(:note_repo) { double }
      subject do
        described_class.new(
          repos: {
            note: note_repo,
          },
        )
      end

      context "when text is provided" do
        it "creates a note" do
          query = %|
            mutation submitNoteMutation {
              submitNote(
                bookId: "1",
                elementId: "1",
                text: "Just a note."
              ) {
                id
              }
            }
          |

          expect(note_repo).to receive(:create) { double(Note, id: 1) }

          result = subject.run(
            query: query,
            context: { current_user: current_user },
          )

          expect(result.dig("data", "submitNote", "id")).not_to be_nil
        end
      end

      context 'when the text is not provided' do
        it "fails to create a note"
      end
    end
  end
end
