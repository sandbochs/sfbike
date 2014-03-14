class BicycleParking < ActiveRecord::Base
  reverse_geocoded_by :latitude, :longitude
  scope :completed, -> { where status: 'COMPLETE' }

  SEARCH_PARAMS = { min_results: 3, start_diameter: 0.5, max_diameter: 5 }

  def self.search_within(lat, long, min_results=1, results=[],  diameter=0.1, inc_diameter=0.1, max_diameter=20)
    return results if results.length >= min_results || diameter > max_diameter

    # Consider the runtime complexity of this recursive call. As the diameter increases we rescan the previous search area.
    nearby_parking = self.completed.near([lat, long], diameter)
    search_within lat, long, min_results, nearby_parking, diameter + inc_diameter, inc_diameter, max_diameter
  end

  def self.search(lat, long, max_results)
    nearby_parking = search_within lat, long, SEARCH_PARAMS[:min_results], [], SEARCH_PARAMS[:start_diameter], SEARCH_PARAMS[:start_diameter], SEARCH_PARAMS[:max_diameter]
    nearby_parking.length > max_results ? nearby_parking[0...max_results] : nearby_parking
  end
end