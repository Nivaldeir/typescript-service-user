import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { BaseRepository } from "../../../application/repository/interface/BaseRepository";

interface Constructor<T> {
    new(...args: any[]): T;
}
type ClassGenerict = {
    get(): any
}

export class GenericRepositoryDatabase<T extends ClassGenerict> implements BaseRepository<T> {
    private readonly createInstance: Constructor<T>;
    constructor(createInstance: Constructor<T>, private readonly client: any) {
        this.createInstance = createInstance;
    }
    async get(params: { [key: string]: string; }): Promise<T> {
        const output = await this.client.findFirst({
            where: params
        });
        if (!output) {
            throw new Error("NOT_FOUND")
        }
        return new this.createInstance(output)
    }
    async show(params: { id?: string[]; email?: string[]; name?: string[]; page?: number; take?: number; }): Promise<T[]> {
        const whereCondition: any = {}
        if (params.id) whereCondition.id = { in: Array.isArray(params.id) ? params.id : [params.id] }
        if (params.email) whereCondition.email = { in: Array.isArray(params.email) ? params.email : [params.email] }
        if (params.name) whereCondition.name = { in: Array.isArray(params.name) ? params.name : [params.name] }
        const outputs = await this.client.findMany({
            where: {
                ...whereCondition,
            },
            
        })

        return outputs.map((output: any) => new this.createInstance(output)) ?? []
    }

    async save(data: T): Promise<void> {
        try {
            await this.client.create({
                data: data.get(),
            })
        } catch (e: any) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    const messageError = `Unique constraint failed on the fields: (${e?.meta?.target})`
                    throw new Error(messageError)
                }
            }
            throw new Error(e)
        }
    }

    async delete(id: string): Promise<void> {
        return await this.client.update({
            where: {
                id: id,
            },
            data: {
                isActive: false,
            }
        })
    }

    async update(id: string, data: T): Promise<void> {
        return await this.client.update({
            where: {
                id: id,
            },
            data: data.get()
        })

    }
}