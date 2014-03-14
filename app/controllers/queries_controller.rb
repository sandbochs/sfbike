class QueriesController < ApplicationController
  respond_to :json

  def create
    if params[:address].present?
      query = Query.from_address params[:address]
    elsif params[:latitude].present? && params[:longitude].present?
      query = Query.from_coords params[:latitude], params[:longitude]
    end

    respond_with query
  end
end
