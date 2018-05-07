require 'spec_helper'

describe Web::GraphQL::Runner do
  context 'closeNote mutation' do
    let(:current_user) { double(User, id: 1) }
    let(:note_repo) { double(NoteRepository) }
    subject { described_class.new(note_repo: note_repo) }

    it "closes a note" do
      query = %|
        mutation closeNoteMutation {
          closeNote(id: "1") {
            id
            state
          }
        }
      |

      expect(note_repo).to receive(:close).with("1") do
        double(Note, id: 1, state: "closed")
      end

      result = subject.run(
        query: query,
        context: { current_user: current_user },
      )
      note = result.dig("data", "closeNote")
      expect(note["id"]).to eq("1")
      expect(note["state"]).to eq("closed")
    end
  end
end
