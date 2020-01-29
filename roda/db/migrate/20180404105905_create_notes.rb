ROM::SQL.migration do
  change do
    create_table :notes do
      primary_key :id
      column :text, String
      column :state, String

      foreign_key :element_id, :elements, on_delete: :cascade, null: false
      foreign_key :user_id, :users, on_delete: :cascade, null: false

      column :created_at, DateTime, null: false
      column :updated_at, DateTime, null: false
    end
  end
end
