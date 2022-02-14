'use strict'
const exGraphql = require('express-graphql')
const graphqlSchema = require('./schema/schema.js')
const path = require('path')

module.exports = function (app, opts) {
  // GraphQL routes
  app.use(
    '/graphql',
    exGraphql({
      schema: graphqlSchema,
      graphiql: true,
      pretty: true
    })
  )
}