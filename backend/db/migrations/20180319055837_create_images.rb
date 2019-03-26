Hanami::Model.migration do
  change do
    create_table :images do
      primary_key :id
      column :filename, String
      column :image_data, String

      foreign_key :chapter_id, :chapters, on_delete: :cascade, null: false

      column :created_at, DateTime, null: false
      column :updated_at, DateTime, null: false
    end
  end
end
