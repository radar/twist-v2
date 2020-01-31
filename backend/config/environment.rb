require 'bundler/setup'
require 'babosa'

require_relative './boot'
require_relative '../app'

Twist::Container.finalize!
