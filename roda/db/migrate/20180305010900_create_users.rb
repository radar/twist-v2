ROM::SQL.migration do
  change do
    create_table :users do
      primary_key :id

      column :email, String
      column :encrypted_password, String

      column :created_at, DateTime, null: false
      column :updated_at, DateTime, null: false
    end
  end
end
