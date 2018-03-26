Hanami::Model.migration do
  change do
    create_table :branches do
      primary_key :id
      column :name, String
      foreign_key :book_id, :books, on_delete: :cascade, null: false
      column :default, TrueClass

      column :created_at, DateTime, null: false
      column :updated_at, DateTime, null: false
    end
  end
end
