import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './resolvers';
import { readFileSync } from 'fs';
import { join } from 'path';
import { context, Context } from './context';

const typeDefs = readFileSync(
  join(__dirname, 'schema.graphql'),
  'utf-8'
);

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

async function startServer() {
  try {
    const { url } = await startStandaloneServer(server, {
      context: async () => context,
      listen: { port: parseInt(process.env.PORT || '4000') },
    });
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

process.on('SIGTERM', () => {
  console.log('Shutting down gracefully...');
  context.prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  context.prisma.$disconnect();
  process.exit(0);
});

startServer();