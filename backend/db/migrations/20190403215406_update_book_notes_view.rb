Hanami::Model.migration do
  change do
    view_query = self[:notes]
    .join(:elements, id: :element_id)
    .join(:chapters, id: :chapter_id)
    .join(:commits, id: :commit_id)
    .join(:branches, id: :branch_id)
    .select_all(:notes)
    .select_append(Sequel[:branches][:book_id])

    drop_view :book_notes
    create_view :book_notes, view_query
  end
end
