class Image < Hanami::Entity
  def image
    ImageUploader::Attacher.new(self, :image)
  end
end
