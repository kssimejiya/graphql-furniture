import { PrismaClient } from '@prisma/client';
export interface Context {
    prisma: PrismaClient;
}
export declare const context: {
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
};
