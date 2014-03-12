class CreateBicycleParkings < ActiveRecord::Migration
  def change
    create_table :bicycle_parkings do |t|
      t.string  :location
      t.string  :address
      t.string  :status
      t.string  :status_high_level
      t.string  :year_installed
      t.decimal :latitude
      t.decimal :longitude

      t.timestamps
    end

    add_index :bicycle_parkings, [:latitude, :longitude]
  end
end
