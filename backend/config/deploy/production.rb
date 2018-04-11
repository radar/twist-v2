server "ryanbigg.com", roles: %w{app db web}

set :ssh_options, {
 forward_agent: true,
}

set :default_env, {
  'HANAMI_ENV' => 'production',
  'DATABASE_URL' => 'postgres://ryanbigg:jnFzHXFKNLyQ%24PukGbP7TnPmWMGxVgh%5DMnAf%24Cmhi@localhost/twist-v2'
}

set :linked_files, [".env.production"]

set :hanami_env, "production"

set :assets_roles, []
