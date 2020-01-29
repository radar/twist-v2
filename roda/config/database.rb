require "rom-repository"
require "rom-changeset"
require "sequel"

module Twist
  DB = ROM.container(:sql, Sequel.connect(ENV['DATABASE_URL']), extensions: [:pg_json]) do |config|
    config.auto_registration(File.expand_path("lib/twist"))
  end

  class Repository < ROM::Repository::Root
    def self.new
      super(DB)
    end
  end
end
