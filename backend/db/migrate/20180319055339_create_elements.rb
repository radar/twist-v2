ROM::SQL.migration do
  change do
    create_table :elements do
      primary_key :id
      column :tag, String
      column :content, String

      foreign_key :chapter_id, :chapters, on_delete: :cascade, null: false

      column :created_at, DateTime, null: false
      column :updated_at, DateTime, null: false
    end
  end
end
