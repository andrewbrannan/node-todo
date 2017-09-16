"use strict"

var config = {};

config.jwtsecret = process.env.JWTSECRET || 'thequickbrownfoxjumpedoverthelazydog'
config.db_url = process.env.DATABASE_URL || 'postgres://andrewbrannan@localhost:5432/todo'

module.exports=config
