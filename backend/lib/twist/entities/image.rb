module Twist
  module Entities
    class Image < ROM::Struct
      include ImageUploader::Attachment(:image)
    end
  end
end
