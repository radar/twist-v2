Hanami::Model.migration do
  change do
    create_table :chapters do
      primary_key :id
      column :title, String
      column :position, Integer
      column :file_name, String
      column :part, String
      column :permalink, String

      foreign_key :commit_id, :commits, on_delete: :cascade, null: false

      column :created_at, DateTime, null: false
      column :updated_at, DateTime, null: false
    end
  end
end
