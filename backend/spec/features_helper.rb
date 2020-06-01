# Require this file for feature tests
require_relative './spec_helper'

require 'capybara'
require 'capybara/dsl'
require 'capybara/rspec'

require 'selenium/webdriver'

# Selenium::WebDriver.logger.level = :debug

Capybara.default_max_wait_time = 10

if ENV['DOCKER']
  Capybara.javascript_driver = :selenium_remote_chrome
  Capybara.register_driver "selenium_remote_chrome".to_sym do |app|
    Capybara::Selenium::Driver.new(app, browser: :remote, url: "http://selenium:4444/wd/hub", desired_capabilities: :chrome)
  end

  Capybara.current_driver = :selenium_remote_chrome
else
  Capybara.register_driver :chrome_headless do |app|
    options = ::Selenium::WebDriver::Chrome::Options.new

    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--window-size=1400,1400')
    # options.add_argument('--enable-logging')
    # options.add_argument('--v=1')

    Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
  end
end

Capybara.current_driver = :selenium_chrome

Capybara.app = Twist::Web.app
Capybara.server = :puma
Capybara.server_host = '127.0.0.1'
Capybara.server_port = 3030
Capybara.app_host = ENV['FRONTEND_APP_URL']
