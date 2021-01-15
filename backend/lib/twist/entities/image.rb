require 'twist/image_uploader'

module Twist
  class Image < ROM::Struct
    include ImageUploader::Attachment(:image)
  end
end
