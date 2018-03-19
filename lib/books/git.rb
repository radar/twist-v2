require 'rugged'

class Git
  attr_reader :username, :repo, :branch, :test, :target

  def initialize(username:, repo:, branch: "master", target: File.expand_path(File.join(__dir__, "../../repos")), test: false)
    @username = username
    @repo = repo
    @branch = branch
    @test = test
    @target = target

    @creds = Rugged::Credentials::SshKey.new(
      username: 'git',
      publickey: File.expand_path("~/.ssh/id_rsa.pub"),
      privatekey: File.expand_path("~/.ssh/id_rsa"),
    )
  end

  def clone
    Rugged::Repository.clone_at(
      source_path,
      local_path,
      credentials: @creds,
    )
  end

  def local_path
    (Pathname.new(target) + "#{username}/#{repo}").to_s
  end

  def rugged_repo
    Rugged::Repository.new(local_path)
  end

  private

  def source
    if test
      File.expand_path(File.join(__dir__, "../../spec/fixtures")) + "/"
    else
      "git@github.com:"
    end
  end

  def source_path
    source + "#{username}/#{repo}"
  end
end
