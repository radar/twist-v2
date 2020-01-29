ROM::SQL.migration do
  change do
    create_table :commits do
      primary_key :id

      column :sha, String

      foreign_key :branch_id, :branches, on_delete: :cascade, null: false

      column :created_at, DateTime, null: false
      column :updated_at, DateTime, null: false
    end
  end
end
