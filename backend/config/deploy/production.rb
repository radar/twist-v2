server "api.twistbooks.com", roles: %w{app db web}


set :ssh_options, {
 forward_agent: true,
}

set :linked_files, [".env.production"]
set :deploy_user, "ryanbigg"

set :assets_roles, []
