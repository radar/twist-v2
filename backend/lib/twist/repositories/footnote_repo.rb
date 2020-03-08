module Twist
  module Repositories
    class FootnoteRepo < Twist::Repository[:footnotes]
      commands :create, use: :timestamps, plugins_options: { timestamps: { timestamps: %i(created_at updated_at) } }

      def by_identifier(identifier)
        footnotes.where(identifier: identifier).first
      end

      def by_chapter_and_commit(chapter_id, commit_id)
        footnotes.where(chapter_id: chapter_id, commit_id: commit_id).to_a
      end

      def link_to_commit_chapter(identifier, commit_id, chapter_id)
        footnotes
          .where(identifier: identifier, commit_id: commit_id)
          .update(chapter_id: chapter_id)
      end

      def for_commit(commit_id)
        footnotes.where(commit_id: commit_id).to_a
      end

      def find_or_create(fields)
        footnote = footnotes.where(
          commit_id: fields[:commit_id],
          identifier: fields[:identifier],
        ).first

        return footnote if footnote

        create(fields)
      end
    end
  end
end
