require 'spec_helper'

module Twist
  describe Web::GraphQL::Runner do
    context 'submitNote mutation' do
      let(:current_user) { double(Entities::User, id: 1) }
      let(:note_repo) { double }
      let(:book_repo) { double(Repositories::BookRepo) }
      subject do
        described_class.new(
          repos: {
            book: book_repo,
            note: note_repo,
          },
        )
      end

      let(:book) { double(Entities::Book, id: 1) }

      before do
        expect(book_repo).to receive(:find_by_permalink) { book }
      end

      context "when text is provided" do
        it "creates a note" do
          query = %|
            mutation submitNoteMutation {
              submitNote(
                input: {
                  bookPermalink: "example-book",
                  elementId: "1",
                  text: "Just a note."
                }
              ) {
                id
              }
            }
          |

          expect(note_repo).to receive(:create) { double(Entities::Note, id: 1) }

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
