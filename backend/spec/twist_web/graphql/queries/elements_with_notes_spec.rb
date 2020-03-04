require 'spec_helper'

module Twist
  describe Web::GraphQL::Runner do
    context 'chapter' do
      let(:current_user) { double(User, id: 1) }
      let(:user_1) { current_user }
      let(:user_2) { double(User, id: 2) }
      let(:book_repo) { double(Repositories::BookRepo) }
      let(:chapter_repo) { double(Repositories::ChapterRepo) }
      let(:element_repo) { double(Repositories::ElementRepo) }
      let(:book_note_repo) { double(Repositories::BookNoteRepo) }
      let(:user_repo) { double(Repositories::UserRepo) }
      let(:book) do
        double(
          Book,
          id: 1,
          title: "Exploding Rails",
          permalink: "exploding-rails",
        )
      end

      let(:book_note_1) do
        double(
          BookNote,
          id: 1,
          number: 1,
          text: "Hello World",
          created_at: Time.now,
          state: "open",
          user_id: 1,
          element_id: 1,
        )
      end

      let(:book_note_2) do
        double(
          BookNote,
          id: 2,
          number: 2,
          text: "Hello World",
          created_at: Time.now,
          state: "open",
          user_id: 2,
          element_id: 1,
        )
      end

      let(:element) do
        double(
          Element,
          id: 2,
          chapter_id: 1,
          content: "<p>Hello World</p>",
          tag: "p",
          notes_count: 1,
          image_id: 1,
        )
      end

      subject do
        described_class.new(
          repos: {
            book: book_repo,
            book_note: book_note_repo,
            element: element_repo,
            user: user_repo,
          },
        )
      end

      it "finds the right users" do
        # Simplified dramatically from frontend/src/Book/Notes/NotesQuery.tsx
        # Dataloader was loading things incorrectly, and this is a regression test
        query = %|
        query bookQuery($bookPermalink: String!, $state: NoteState!) {
          elementsWithNotes(bookPermalink: $bookPermalink, state: $state) {
            notes(state: $state) {
              ...note
            }
          }
        }

        fragment note on Note {
          id
          user {
            id
          }
        }
        |

        expect(book_repo).to receive(:find_by_permalink) { book }
        expect(book_note_repo).to receive(:by_book_and_state) { [book_note_1, book_note_2] }
        expect(book_note_repo).to receive(:by_element_and_state) { [book_note_1, book_note_2] }
        expect(element_repo).to receive(:by_ids) { [element] }
        expect(user_repo).to receive(:by_ids) { [user_1, user_2] }

        result = subject.run(
          query: query,
          variables: {
            bookPermalink: "exploding-rails",
            state: "OPEN",
          },
          context: { current_user: current_user },
        )

        user_ids = result
          .dig("data", "elementsWithNotes")
          .first["notes"]
          .map { |note| note.dig("user", "id") }
          .map(&:to_i)

        expect(user_ids).to include(user_1.id)
        expect(user_ids).to include(user_2.id)
      end
    end
  end
end
