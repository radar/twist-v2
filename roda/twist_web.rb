require 'dry/system/container'

class TwistWeb < Dry::System::Container
  configure do |config|
    config.root = File.expand_path('./twist_web')

    # we set 'lib' relative to `root` as a path which contains class definitions
    # that can be auto-registered
    config.auto_register = 'lib'
  end

  # this alters $LOAD_PATH hence the `!`
  load_paths!('lib')
end


require 'hanami/controller'
