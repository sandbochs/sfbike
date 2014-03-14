Sfbike::Application.routes.draw do
  resources :queries, only: [:create]
end
