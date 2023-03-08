require 'rugged'

module Twist
  class Git
    attr_reader :username, :repo, :branch, :test, :target, :logger

    class << self
      attr_accessor :test
    end

    def initialize(username:, repo:, branch: "master", target: File.expand_path(File.join(__dir__, "../../repos")), logger: Logger.new($STDOUT))
      @username = username
      @repo = repo
      @branch = branch
      @target = target
      @logger = logger

      @creds = Rugged::Credentials::SshKey.new(
        username: 'git',
        publickey: File.expand_path("~/.ssh/id_rsa.pub"),
        privatekey: File.expand_path("~/.ssh/id_rsa"),
      )
    end

    def fetch!
      File.exist?(local_path) ? update : clone
      { sha: head.oid, message: head.message }
    end

    def clone
      log_info "Cloning #{source_path} to #{local_path}"

      Rugged::Repository.clone_at(
        source_path.to_s,
        local_path.to_s,
        credentials: @creds,
      )
    end

    def update
      log_info "Updating #{local_path} with latest from #{source_path}: origin/#{branch}"

      rugged_repo.reset("origin/#{branch}", :hard)
      rugged_repo.fetch("origin", credentials: @creds)
      rugged_repo.checkout("origin/#{branch}")
    end

    def local_path
      Pathname.new(target) + "#{username}/#{repo}"
    end

    def rugged_repo
      Rugged::Repository.new(local_path)
    end

    def source_path
      source + "#{username}/#{repo}"
    end

    def head
      rugged_repo.head.target
    end

    private

    def source
      if self.class.test
        Pathname.new(File.expand_path(File.join(__dir__, "../../spec/twist/repos")))
      else
        "git@github.com:"
      end
    end

    def log_info(message)
      logger&.info message
    end
  end
end
