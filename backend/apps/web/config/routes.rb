post '/books/:permalink/receive', to: 'books#receive'

options '/graphql', to: 'graphql#run'
post '/graphql', to: 'graphql#run'

get '/', to: 'home#index', as: :home
