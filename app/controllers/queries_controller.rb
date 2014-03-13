class QueriesController < ApplicationController
  respond_to :json

  def create
    if params[:address].present?
      query = Query.from_address params[:address]
    elsif params[:coords].present?
      query = Query.from_coords params[:coords]
    end

    respond_with query
  end
end
