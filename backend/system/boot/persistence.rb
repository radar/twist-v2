Twist::Container.boot(:persistence) do
  init do
    require "rom-repository"
    require "rom-changeset"
    require "sequel"
  end

  start do
    container = ROM.container(:sql, Sequel.connect(ENV['DATABASE_URL']), extensions: [:pg_json]) do |config|
      config.auto_registration(File.expand_path("lib/twist"))
    end
    register(:database, container)
  end
end
