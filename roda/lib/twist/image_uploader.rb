require "shrine"

class ImageUploader < Shrine
  if ENV['APP_ENV'] == "test"
    require 'shrine/storage/file_system'
    self.storages = {
      store: Shrine::Storage::FileSystem.new("public", prefix: "uploads/store"),
      cache: Shrine::Storage::FileSystem.new("public", prefix: "uploads/cache"),
    }
  else
    require 'shrine/storage/s3'
    S3_OPTIONS = {
      access_key_id: ENV.fetch('AWS_ACCESS_KEY_ID'),
      secret_access_key: ENV.fetch('AWS_SECRET_ACCESS_KEY'),
      bucket: ENV.fetch('AWS_BUCKET'),
      region: ENV.fetch('AWS_REGION'),
    }.freeze

    self.storages = {
      cache: Shrine::Storage::S3.new(prefix: "cache", **S3_OPTIONS),
      store: Shrine::Storage::S3.new(prefix: "store", **S3_OPTIONS),
    }
  end
end
