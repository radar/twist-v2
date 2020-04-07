module Twist
  class ImageWorker
    include Sidekiq::Worker

    include Import["repositories.image_repo"]

    def perform(image_id, image_path)
      uploader = ImageUploader.new(:store)
      upload = uploader.upload(File.open(image_path))

      image_repo.update_image_data(image_id, upload.to_json)
      image_repo.processed(image_id)
    end
  end
end
