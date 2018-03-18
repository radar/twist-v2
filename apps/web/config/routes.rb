root to: 'books#index'

get '/users/sign_up', to: 'sign_up#new'
post '/users/sign_up', to: 'sign_up#perform', as: :sign_up
get '/users/sign_in', to: 'sign_in#new'
post '/users/sign_in', to: 'sign_in#perform', as: :sign_in
delete '/users/sign_out', to: 'sign_out#perform', as: :sign_out

get '/books', to: 'books#index'
get '/sign_out', to: 'sign_out#perform'
post '/books/:permalink/receive', to: 'books#receive'
