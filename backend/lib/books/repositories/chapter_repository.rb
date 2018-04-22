class ChapterRepository < Hanami::Repository
  associations do
    belongs_to :commit
    has_many :elements
  end

  def by_id(id)
    chapters.by_pk(id).one
  end

  def for_commit(commit_id)
    chapters.where(commit_id: commit_id)
  end

  def for_commit_and_part(commit_id, part)
    for_commit(commit_id).where(part: part)
  end

  def for_commit_and_permalink(commit_id, permalink)
    for_commit(commit_id).where(permalink: permalink).limit(1).one
  end

  def wipe(commit_id)
    for_commit(commit_id).delete
  end

  def previous_chapter(commit_id, chapter)
    return last_chapter_in_previous_part(commit_id, chapter.part) if chapter.position == 1

    for_commit(commit_id)
      .where(position: chapter.position - 1, part: chapter.part)
      .limit(1).one
  end

  def next_chapter(commit_id, chapter)
    chapters = for_commit(commit_id)
    next_chapter_in_part = chapters.where(part: chapter.part, position: chapter.position + 1).limit(1).one
    return next_chapter_in_part if next_chapter_in_part

    chapters.where(part: next_part(chapter.part), position: 1).limit(1).one
  end

  private

  PARTS = %w(frontmatter mainmatter backmatter).freeze

  def last_chapter_in_previous_part(commit_id, part)
    for_commit(commit_id)
      .where(part: previous_part(part))
      .order { position.desc }
      .limit(1).one
  end

  def previous_part(part)
    current_index = PARTS.index(part)
    return if current_index.zero?
    PARTS[current_index - 1]
  end

  def next_part(part)
    PARTS[PARTS.index(part) + 1]
  end
end
