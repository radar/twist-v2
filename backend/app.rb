require 'dry/system/container'
require 'dry/auto_inject'
require 'dry/system/loader/autoloading'
require 'zeitwerk'

module Twist
  class Container < Dry::System::Container
    config.root = __dir__

    config.component_dirs.loader = Dry::System::Loader::Autoloading
    config.component_dirs.add_to_load_path = false
    config.component_dirs.default_namespace = 'twist'

    config.component_dirs.add "lib" do |dir|
      dir.auto_register = true
      dir.default_namespace = 'twist'
    end
  end

  Import = Dry::AutoInject(Container)
end

loader = Zeitwerk::Loader.new
loader.inflector.inflect "graphql" => "GraphQL"
loader.inflector.inflect "cors" => "CORS"
loader.push_dir Twist::Container.config.root.join("lib").realpath
loader.setup
