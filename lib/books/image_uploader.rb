require 'shrine/storage/file_system'

class ImageUploader < Shrine
  self.storages = {
    store: Shrine::Storage::FileSystem.new("public", prefix: "uploads/store"),
    cache: Shrine::Storage::FileSystem.new("public", prefix: "uploads/cache"),
  }
end
