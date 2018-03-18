class BookWorker
  include Sidekiq::Worker

  def perform(permalink, branch)

  end
end
