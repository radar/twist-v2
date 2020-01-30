class TwistWeb < Dry::System::Container
  configure do |config|
    config.root = Pathname('./twist_web')
    config.auto_register = '.'
  end
end

TwistWeb.finalize!
