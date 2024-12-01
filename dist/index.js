"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const resolvers_1 = require("./resolvers");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers: resolvers_1.resolvers,
});
async function startServer() {
    try {
        const { url } = await (0, standalone_1.startStandaloneServer)(server, {
            listen: { port: parseInt(process.env.PORT || '4000') },
        });
        console.log(`🚀 Server ready at ${url}`);
    }
    catch (error) {
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
//# sourceMappingURL=index.js.map