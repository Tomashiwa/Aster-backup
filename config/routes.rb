Rails.application.routes.draw do
  root to: "home#index"
  get "*path", to: "home#index", constraints: { format: "html" }
end
