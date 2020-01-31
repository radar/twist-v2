require "spec_helper"

describe Twist::Transactions::Notes::Submit do
  context 'when given valid parameters' do
    let(:note_repo) { double(Twist::Repositories::NoteRepo) }
    let(:book_note_repo) { double(Twist::Repositories::BookNoteRepo) }
    let(:user) { double(Twist::User, id: 1) }

    subject do
      described_class.new(
        book_note_repo: book_note_repo,
        note_repo: note_repo
      )
    end

    before do
      allow(book_note_repo).to receive(:count_for_book) { 1 }
    end

    it 'creates a note' do
      expect(note_repo).to receive(:create).with(
        number: 2,
        state: "open",
        user_id: user.id,
        element_id: 1,
        text: "New note goes here"
      )

      result = subject.(
        book_id: 1,
        user_id: user.id,
        element_id: 1,
        text: "New note goes here"
      )

      expect(result).to be_a_success
    end
  end
end
