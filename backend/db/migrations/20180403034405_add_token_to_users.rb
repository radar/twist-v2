Hanami::Model.migration do
  change do
    alter_table :users do
      add_column :auth_token, String
    end
  end
end
