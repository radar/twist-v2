class ChapterRepository < Hanami::Repository
  def for_commit(commit_id)
    chapters.where(commit_id: commit_id)
  end

  def wipe(commit_id)
    for_commit(commit_id).delete
  end
end
