module Twist
  class Image < ROM::Struct
    def image
      ImageUploader::Attacher.new(self, :image)
    end
  end
end
