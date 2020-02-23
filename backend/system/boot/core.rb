Twist::Container.boot(:core, namespace: true) do
  use :persistence

  init do
    require 'redcarpet'
    require 'nokogiri'
    require 'pygments'
    require 'sidekiq'

    require "twist/types"
    require "twist/repository"
  end

end
