class QueriesController < ApplicationController
  respond_to :json

  def create
    if params[:address].present?
      query = Query.from_address params[:address]
    elsif params[:latitude].present? && params[:longitude].present?
      query = Query.from_coords params[:latitude], params[:longitude]
    else
      query = Query.from_coords request.location.latitude, request.location.longitude
    end

    respond_with query
  end
end
