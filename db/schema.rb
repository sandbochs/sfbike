# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140312084317) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bicycle_parkings", force: true do |t|
    t.string   "location"
    t.string   "address"
    t.string   "status"
    t.string   "status_high_level"
    t.string   "year_installed"
    t.decimal  "latitude"
    t.decimal  "longitude"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "bicycle_parkings", ["latitude", "longitude"], name: "index_bicycle_parkings_on_latitude_and_longitude", using: :btree

end