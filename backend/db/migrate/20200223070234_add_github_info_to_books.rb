# frozen_string_literal: true

ROM::SQL.migration do
  change do
    alter_table :books do
      add_column :github_user, String
      add_column :github_repo, String
    end
  end
end
