import { users, Prisma } from '@prisma/client';
import { ModelFacade, prismaModel } from './ModelFacade';

class UsersModel implements ModelFacade {
  private static sModel: UsersModel;

  static getModel = (): UsersModel => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!UsersModel.sModel) UsersModel.sModel = new UsersModel();
    return UsersModel.sModel;
  };

  readOne = async (id: string): Promise<users | null> => {
    const data = await prismaModel.users.findFirst({
      where: {
        id,
      },
    });
    return data;
  };

  readAll = async (): Promise<users[]> => {
    const data = await prismaModel.users.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return data;
  };

  insertOne = async (payload: Prisma.usersCreateInput): Promise<users> => {
    const data = await prismaModel.users.create({
      data: {
        ...payload,
      },
    });
    return data;
  };

  insertMany = async (
    payloads: Prisma.usersCreateManyInput[]
  ): Promise<Prisma.BatchPayload> => {
    const data = await prismaModel.users.createMany({
      data: [...payloads],
    });
    return data;
  };

  delete = async (id: string): Promise<users> => {
    const data = await prismaModel.users.delete({
      where: {
        id,
      },
    });
    return data;
  };

  update = async (
    id: string,
    payload: Prisma.usersUpdateInput
  ): Promise<users> => {
    const data = await prismaModel.users.update({
      data: {
        ...payload,
      },
      where: {
        id,
      },
    });
    return data;
  };
}

export { UsersModel };
