import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './resolvers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const typeDefs = `#graphql
  scalar DateTime

  type Color {
    id: ID!
    name: String!
    hex: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    colors: [Color!]!
    color(id: ID!): Color
    colorByName(name: String!): Color
  }

  type Mutation {
    createColor(name: String!, hex: String!): Color!
    updateColor(id: ID!, name: String, hex: String): Color!
    deleteColor(id: ID!): Color!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: parseInt(process.env.PORT || '4000') },
    });
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
const shutdown = async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

startServer();