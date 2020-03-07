# frozen_string_literal: true

ROM::SQL.migration do
  change do
    alter_table :footnotes do
      drop_foreign_key :chapter_id
      add_foreign_key :chapter_id, :chapters, on_delete: :set_null, null: true
    end
  end
end
