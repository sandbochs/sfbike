class Query < ActiveRecord::Base
  GEOCODER_ATTRIBUTES = %w(latitude longitude address city state state_code postal_code country country_code)

  def self.from_address(address)
    g = Geocoder.search(address).first
    q = self.new
    GEOCODER_ATTRIBUTES.each { |a| q.send "#{a}=".to_sym, g.send(a.to_sym) }
    q
  end

  def self.from_coords(lat, long)
    g = Geocoder.search("#{lat}, #{long}").first
    q = self.new
    GEOCODER_ATTRIBUTES.each { |a| q.send "#{a}=".to_sym, g.send(a.to_sym) }
    q
  end

  def nearby_parking
    raise 'Missing latitude and/or longitude' unless latitude.present? && longitude.present?
    BicycleParking.search latitude, longitude, 5
  end
end
