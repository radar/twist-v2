class ChapterRepository < Hanami::Repository
  def for_commit(commit_id)
    chapters.where(commit_id: commit_id)
  end

  def frontmatter(commit_id)
    for_commit(commit_id).where(type: 'frontmatter')
  end

  def mainmatter(commit_id)
    for_commit(commit_id).where(type: 'mainmatter')
  end

  def backmatter(commit_id)
    for_commit(commit_id).where(type: 'backmatter')
  end

  def wipe(commit_id)
    for_commit(commit_id).delete
  end
end
