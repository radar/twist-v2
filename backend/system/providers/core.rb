
Twist::Container.register_provider(:core, namespace: true) do
  prepare do
    require 'redcarpet'
    require 'nokogiri'
    require 'rouge'
    require 'sidekiq'

    require 'dry/monads'
    require 'dry/monads/do'
  end

  start do
    target.start :database
  end

end
