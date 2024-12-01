import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define types for resolver arguments
interface ColorByIdArgs {
  id: string;
}

interface ColorByNameArgs {
  name: string;
}

interface CreateColorArgs {
  name: string;
  hex: string;
}

interface UpdateColorArgs {
  id: string;
  name?: string;
  hex?: string;
}

export const resolvers = {
  Query: {
    colors: async () => {
      return await prisma.color.findMany();
    },
    color: async (_: any, { id }: ColorByIdArgs) => {
      return await prisma.color.findUnique({
        where: { id },
      });
    },
    colorByName: async (_: any, { name }: ColorByNameArgs) => {
      return await prisma.color.findUnique({
        where: { name },
      });
    },
  },
  Mutation: {
    createColor: async (_: any, { name, hex }: CreateColorArgs) => {
      return await prisma.color.create({
        data: {
          name,
          hex,
        },
      });
    },
    updateColor: async (_: any, { id, name, hex }: UpdateColorArgs) => {
      const data: { name?: string; hex?: string } = {};
      if (name) data.name = name;
      if (hex) data.hex = hex;

      return await prisma.color.update({
        where: { id },
        data,
      });
    },
    deleteColor: async (_: any, { id }: ColorByIdArgs) => {
      return await prisma.color.delete({
        where: { id },
      });
    },
  },
};