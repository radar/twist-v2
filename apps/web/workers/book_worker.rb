class BookWorker
  include Sidekiq::Worker

  def perform(permalink, branch)
    # TODO: fill out
  end
end
