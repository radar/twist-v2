Hanami::Model.migration do
  change do
    create_view :book_notes,
      self[:notes]
        .join(:elements, id: :element_id)
        .join(:chapters, id: :chapter_id)
        .join(:commits, id: :commit_id)
        .join(:branches, id: :branch_id)
        .select_all(:notes)
        .select_append(Sequel[:branches][:book_id])
  end
end
