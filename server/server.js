const express = require('express');

const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({ typeDefs, resolvers, });

app.use(routes);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create function to start Apollo server with GraphQL schema
const startApolloServer = async () => {
  await server.start();
  app.use('/graphql', expressMiddleware(server));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
}

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Call function to start server
startApolloServer();



