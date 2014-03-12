namespace :import do
  desc 'import data from DataSF to database'
  task from_api: :environment do
    require 'net/http'
    require 'json'

    uri = URI 'http://data.sfgov.org/resource/w969-5mn4.json'
    response = Net::HTTP.get_response uri

    if response.is_a? Net::HTTPSuccess
      BicycleParking.destroy_all

      JSON.parse(response.body).each do |bicycle_parking|
        bp = BicycleParking.new
        bp.location = bicycle_parking['location_name']
        bp.address = bicycle_parking['yr_inst']
        bp.racks = bicycle_parking['racks_installed']
        bp.status = bicycle_parking['status']
        bp.status_detail = bicycle_parking['status_detail']
        bp.year_installed = bicycle_parking['yr_installed']
        bp.latitude = bicycle_parking['coordinates']['latitude'].to_f
        bp.longitude = bicycle_parking['coordinates']['longitude'].to_f

        bp.save
      end
    else
      raise "Could not retrieve data from DataSF API (#{uri})"
    end

  end
end
