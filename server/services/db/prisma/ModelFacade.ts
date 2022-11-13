import { Prisma, PrismaClient } from '@prisma/client';

const prismaModel = new PrismaClient();

interface ModelFacade {
  readOne: (id: string) => Promise<any>;
  readAll: () => Promise<any[]>;
  insertOne: (payload: any) => any;
  insertMany: (payloads: any) => Promise<Prisma.BatchPayload>;
  delete: (id: string) => Promise<any>;
  update: (id: string, payload: { [key: string]: string }) => Promise<any>;
}

export { ModelFacade, prismaModel };
