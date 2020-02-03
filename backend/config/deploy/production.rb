server "198.199.109.202", roles: %w{app db web}

set :ssh_options, {
 forward_agent: true,
}

set :linked_files, [".env.production"]

set :assets_roles, []
