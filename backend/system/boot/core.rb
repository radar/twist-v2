
Twist::Container.boot(:core, namespace: true) do
  use :persistence

  init do
    require 'redcarpet'
    require 'nokogiri'
    require 'pygments'
    require 'sidekiq'

    require 'dry/monads'
    require 'dry/monads/do'
  end

end
