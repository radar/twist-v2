Hanami::Model.migration do
  change do
    alter_table :users do
      add_column :github_login, String
    end
  end
end
