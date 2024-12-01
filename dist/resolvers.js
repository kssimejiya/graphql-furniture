"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.resolvers = {
    Query: {
        colors: async () => {
            return await prisma.color.findMany();
        },
        color: async (_, { id }) => {
            return await prisma.color.findUnique({
                where: { id },
            });
        },
        colorByName: async (_, { name }) => {
            return await prisma.color.findUnique({
                where: { name },
            });
        },
    },
    Mutation: {
        createColor: async (_, { name, hex }) => {
            return await prisma.color.create({
                data: {
                    name,
                    hex,
                },
            });
        },
        updateColor: async (_, { id, name, hex }) => {
            const data = {};
            if (name)
                data.name = name;
            if (hex)
                data.hex = hex;
            return await prisma.color.update({
                where: { id },
                data,
            });
        },
        deleteColor: async (_, { id }) => {
            return await prisma.color.delete({
                where: { id },
            });
        },
    },
};
//# sourceMappingURL=resolvers.js.map