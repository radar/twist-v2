require 'spec_helper'

describe Web::GraphQL::Runner do
  context 'openNote mutation' do
    let(:current_user) { double(User, id: 1) }
    let(:note_repo) { double(NoteRepository) }
    subject do
      described_class.new(
        repos: {
          note: note_repo
        }
      )
    end

    it "opens a note" do
      query = %|
        mutation openNoteMutation {
          openNote(id: "1") {
            id
            state
          }
        }
      |

      expect(note_repo).to receive(:open).with("1") do
        double(Note, id: 1, state: "open")
      end

      result = subject.run(
        query: query,
        context: { current_user: current_user },
      )

      note = result.dig("data", "openNote")
      expect(note["id"]).to eq("1")
      expect(note["state"]).to eq("open")
    end
  end
end
