get '/oauth/authorize', to: 'oauth#authorize'
get '/oauth/callback',  to: 'oauth#callback', as: :oauth_callback

post '/books/:permalink/receive', to: 'books#receive'

options '/graphql', to: 'graphql#run'
post '/graphql', to: 'graphql#run'

get '/', to: 'home#index', as: :home
