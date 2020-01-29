ROM::SQL.migration do
  change do
    alter_table :users do
      drop_column :auth_token
    end
  end
end
