ROM::SQL.migration do
  change do
    create_table :comments do
      primary_key :id
      column :text, String

      foreign_key :note_id, :notes, on_delete: :cascade, null: false
      foreign_key :user_id, :users, on_delete: :cascade, null: false

      column :created_at, DateTime, null: false
      column :updated_at, DateTime, null: false
    end
  end
end
