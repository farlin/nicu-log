class CreateRecords < ActiveRecord::Migration
  def change
    create_table :records do |t|
      t.date :visited_at
      t.string :summary

      t.timestamps null: false
    end
  end
end
