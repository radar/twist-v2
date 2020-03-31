require "spec_helper"

describe Twist::Transactions::Notes::Submit do
  context 'when given valid parameters' do
    let(:book_repo) { double(Twist::Repositories::BookRepo) }
    let(:note_repo) { double(Twist::Repositories::NoteRepo) }
    let(:book_note_repo) { double(Twist::Repositories::BookNoteRepo) }
    let(:user) { double(Twist::User, id: 1) }

    subject do
      described_class.new(
        book_repo: book_repo,
        book_note_repo: book_note_repo,
        note_repo: note_repo,
      )
    end

    before do
      allow(book_repo).to receive(:find_by_permalink) { double(id: 1) }
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
        book_permalink: "example-book",
        user_id: user.id,
        element_id: 1,
        text: "New note goes here"
      )

      expect(result).to be_a_success
    end
  end
end
