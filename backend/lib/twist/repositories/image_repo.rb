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
          updated_image = update_image(image, image_path, caption)
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

      private

      def update_image(image, image_path, caption)
        upload = upload_image(image_path)
        update(image.id, caption: caption, image_data: upload.to_json)
      end

      def create_image(chapter_id, filename, image_path, caption)
        upload = upload_image(image_path)
        create(
          caption: caption,
          chapter_id: chapter_id,
          filename: filename,
          image_data: upload.to_json,
        )
      end

      def upload_image(image_path)
        uploader = ImageUploader.new(:store)
        uploader.upload(File.open(image_path))
      end
    end
  end
end
