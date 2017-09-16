"use strict"

// Obviously in production this shouldn't be in source countrol ;)

var config = {};

config.jwtsecret = process.env.JWTSECRET || 'thequickbrownfoxjumpedoverthelazydog'

module.exports=config
