class BicycleParking < ActiveRecord::Base
  reverse_geocoded_by :latitude, :longitude

  scope :completed, -> { where status: 'COMPLETE' }

  def self.nearby(lat, long, min_results=1, results=[],  diameter=0.1, max_diameter=20)
    return results if results.length >= min_results || diameter > max_diameter

    # Consider the runtime complexity of this recursive call. As the diameter increases we rescan the previous search area.
    self.nearby lat, long, min_results, self.completed.near([lat, long], diameter), diameter + 0.1, max_diameter
  end
end
