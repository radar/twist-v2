get '/oauth/authorize', to: 'oauth#authorize'
get '/oauth/callback',  to: 'oauth#callback', as: :oauth_callback

options '/graphql', to: 'graphql#run'
post '/graphql', to: 'graphql#run'
get '/graphql/run', to: 'graphql#run'
