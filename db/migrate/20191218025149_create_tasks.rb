class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.references :list, null: true, foreign_key: true
      t.string :title
      t.text :description
      t.references :tag, null: true, foreign_key: true
      t.datetime :due_date

      t.timestamps
    end
  end
  
end