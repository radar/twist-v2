require 'twist/image_uploader'

module Twist
  module Repositories
    class ImageRepo < Twist::Repository[:images]
      commands :create, use: :timestamps, plugins_options: { timestamps: { timestamps: %i(created_at updated_at) } }
      commands update: :by_pk

      def find_or_create_image(chapter_id, filename, image_path, caption)
        image = images.where(
          chapter_id: chapter_id,
          filename: filename,
        ).limit(1).one

        if image
          updated_image = update_caption(image.id, caption)
          upload_image(image.id, image_path)
          return updated_image
        end

        create_image(chapter_id, filename, image_path, caption)
      end

      def by_chapter(chapter_id)
        images.where(chapter_id: chapter_id).to_a
      end

      def by_ids(ids)
        images.where(id: ids).to_a
      end

      def update_image_data(image_id, image_data)
        update(image_id, image_data: image_data)
      end

      def processed(image_id)
        update(image_id, status: 'processed')
      end

      private

      def update_caption(image_id, caption)
        update(image_id, caption: caption)
      end

      def create_image(chapter_id, filename, image_path, caption)
        image = create(
          caption: caption,
          chapter_id: chapter_id,
          filename: filename,
          status: 'processing',
        )

        upload_image(image.id, image_path)

        image
      end

      def upload_image(image_id, image_path)
        ImageWorker.perform_async(image_id, image_path)
      end
    end
  end
end
