root to: 'books#index'

get '/users/sign_up', to: 'sign_up#new'
post '/users/sign_up', to: 'sign_up#create', as: :sign_up
get '/users/sign_in', to: 'sign_in#new'
post '/users/sign_in', to: 'sign_in#create', as: :sign_in

get '/books', to: 'books#index'
