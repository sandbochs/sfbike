class BicycleParkingsController < ApplicationController
  respond_to :json

  def index
    respond_with BicycleParking.all
  end
end
