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
export declare const resolvers: {
    Query: {
        colors: () => Promise<{
            id: string;
            name: string;
            hex: string;
            createdAt: Date;
            updatedAt: Date;
        }[]>;
        color: (_: any, { id }: ColorByIdArgs) => Promise<{
            id: string;
            name: string;
            hex: string;
            createdAt: Date;
            updatedAt: Date;
        } | null>;
        colorByName: (_: any, { name }: ColorByNameArgs) => Promise<{
            id: string;
            name: string;
            hex: string;
            createdAt: Date;
            updatedAt: Date;
        } | null>;
    };
    Mutation: {
        createColor: (_: any, { name, hex }: CreateColorArgs) => Promise<{
            id: string;
            name: string;
            hex: string;
            createdAt: Date;
            updatedAt: Date;
        }>;
        updateColor: (_: any, { id, name, hex }: UpdateColorArgs) => Promise<{
            id: string;
            name: string;
            hex: string;
            createdAt: Date;
            updatedAt: Date;
        }>;
        deleteColor: (_: any, { id }: ColorByIdArgs) => Promise<{
            id: string;
            name: string;
            hex: string;
            createdAt: Date;
            updatedAt: Date;
        }>;
    };
};
export {};
