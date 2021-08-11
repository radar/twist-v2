require 'spec_helper'

module Twist
  describe Web::GraphQL::Runner do
    context 'updateNote mutation' do
      let(:current_user) { double(Entities::User, id: 1) }
      let(:note_repo) { double(Repositories::NoteRepo) }
      subject do
        described_class.new(
          repos: {
            note: note_repo,
          },
        )
      end

      context "when signed in as the note's owner" do
        it "updates a note" do
          query = %|
            mutation updateNoteMutation {
              updateNote(id: "1", text: "New text goes here") {
                id
                text
                state
              }
            }
          |

          expect(note_repo).to receive(:find).with("1") do
            double(Entities::Note, id: 1, text: "Old text", state: "open", user_id: 1)
          end

          expect(note_repo).to receive(:update_text).with("1", text: "New text goes here") do
            double(Entities::Note, id: 1, text: "New text goes here", state: "open")
          end

          result = subject.run(
            query: query,
            context: { current_user: current_user },
          )

          note = result.dig("data", "updateNote")
          expect(note["id"]).to eq("1")
          expect(note["state"]).to eq("open")
          expect(note["text"]).to eq("New text goes here")
        end
      end

      context "when signed in as a different user" do
        let(:current_user) { double(Entities::User, id: 2) }
        it "does not update the note" do
          query = %|
            mutation updateNoteMutation {
              updateNote(id: "1", text: "New text goes here") {
                id
                text
                state
              }
            }
          |

          expect(note_repo).to receive(:find).with("1") do
            double(Entities::Note, id: 1, text: "Old text", state: "open", user_id: 1)
          end

          expect(note_repo).not_to receive(:update_text)

          result = subject.run(
            query: query,
            context: { current_user: current_user },
          )

          note = result.dig("data", "updateNote")
          expect(note["id"]).to eq("1")
          expect(note["state"]).to eq("open")
          expect(note["text"]).to eq("Old text")
        end
      end
    end
  end
end
