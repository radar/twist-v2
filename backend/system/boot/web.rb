Twist::Container.boot(:web, namespace: true) do
  init do
    require 'graphql'
    require 'dataloader'
    require 'oauth2'
    require 'octokit'
    require 'hanami/controller'
    require 'hanami/router'
    require 'hanami/action/session'
    require 'hanami/middleware/body_parser'
  end
end
