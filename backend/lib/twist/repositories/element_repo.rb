module Twist
  module Repositories
    class ElementRepo < Twist::Repository[:elements]
      commands :create, use: :timestamps, plugins_options: { timestamps: { timestamps: %i(created_at updated_at) } }

      def by_chapter(chapter_id)
        by_chapter_scope(chapter_id).to_a
      end

      def by_chapter_and_tag(chapter_id, tag)
        by_chapter_scope(chapter_id).where(tag: tag).to_a
      end

      def by_ids(ids)
        elements.where(id: ids).to_a
      end

      def by_id(id)
        elements.where(id: id).one
      end

      def sections_for_chapter(chapter_id)
        by_chapter_scope(chapter_id).where(tag: %w(h2 h3)).to_a
      end

      def delete_all_chapter_elements(chapter_id)
        by_chapter_scope(chapter_id).delete
      end

      private

      def by_chapter_scope(chapter_id)
        elements.where(chapter_id: chapter_id)
      end
    end
  end
end
