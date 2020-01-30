# Require this file for feature tests
require_relative './spec_helper'

require 'capybara'
require 'capybara/dsl'
require 'capybara/rspec'

require 'selenium/webdriver'

# Selenium::WebDriver.logger.level = :debug

Capybara.default_max_wait_time = 10

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

Capybara.current_driver = :chrome_headless

Capybara.app_host = ENV['FRONTEND_APP_URL']
