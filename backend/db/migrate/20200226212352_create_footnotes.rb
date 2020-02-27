ROM::SQL.migration do
  change do
    create_table :footnotes do
      primary_key :id
      column :identifier, String
      column :content, String

      foreign_key :commit_id, :commits, on_delete: :cascade, null: false
      foreign_key :chapter_id, :chapters, on_delete: :cascade, null: true

      column :created_at, DateTime, null: false
      column :updated_at, DateTime, null: false
    end
  end
end
