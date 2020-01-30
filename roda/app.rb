require 'dry/system/container'
require 'dry/auto_inject'

module Twist
  class Container < Dry::System::Container
    configure do |config|
      config.root = File.expand_path('.')
      config.default_namespace = 'twist'

      config.auto_register = 'lib'
    end

    load_paths!('lib')
  end

  Import = Dry::AutoInject(Container)
end
