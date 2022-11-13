import { posts, Prisma } from '@prisma/client';
import { ModelFacade, prismaModel } from './ModelFacade';

class PostsModel implements ModelFacade {
  private static sModel: PostsModel;

  static getModel = (): PostsModel => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!PostsModel.sModel) PostsModel.sModel = new PostsModel();
    return PostsModel.sModel;
  };

  readOne = async (id: string): Promise<posts | null> => {
    const data = await prismaModel.posts.findFirst({
      where: {
        id,
      },
    });
    return data;
  };

  readAll = async (): Promise<posts[]> => {
    const data = await prismaModel.posts.findMany({
      select: {
        created_at: true,
        title: true,
        id: true,
      },
    });
    return data;
  };

  insertOne = async (payload: Prisma.postsCreateInput): Promise<posts> => {
    const data = await prismaModel.posts.create({
      data: {
        ...payload,
      },
    });
    return data;
  };

  insertMany = async (
    payloads: Prisma.postsCreateManyInput[]
  ): Promise<Prisma.BatchPayload> => {
    const data = await prismaModel.posts.createMany({
      data: [...payloads],
    });
    return data;
  };

  delete = async (id: string): Promise<posts> => {
    const data = await prismaModel.posts.delete({
      where: {
        id,
      },
    });
    return data;
  };

  update = async (
    id: string,
    payload: Prisma.postsUpdateInput
  ): Promise<posts> => {
    const data = await prismaModel.posts.update({
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

export { PostsModel };
