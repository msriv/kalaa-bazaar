import { ModelFacade } from '../services/db/prisma/ModelFacade';
import { generateUID, Prisma } from '../support/import.modules';

interface typeItem {
  id: string;
  created_at: number;
  updated_at: number;
  [key: string]: any;
}

type typeStoreNames = Prisma.ModelName;

interface IStore {
  data: typeItem[];
  updated_at: number; // unix timestamp
  created_at: number;
}

interface Store {
  readOne: (id: string) => Promise<typeItem | undefined>;
  readAll: () => Promise<typeItem[]>;
  insertOne: (payload: { [key: string]: any }) => Promise<string>;
  insertMany: (payloads: Array<{ [key: string]: any }>) => Promise<string[]>;
  delete: (id: string) => Promise<void>;
  update: (id: string, payload: typeItem) => Promise<void>;
}

class InMemoryStore implements Store {
  private store: IStore;

  constructor() {
    this.store = {
      data: [],
      updated_at: Date.now(),
      created_at: Date.now(),
    };
  }

  readOne = async (id: string): Promise<typeItem | undefined> => {
    return this.store.data.find(item => item.id === id);
  };

  readAll = async (): Promise<typeItem[]> => this.store.data;

  insertOne = async (payload: { [key: string]: any }): Promise<string> => {
    const resourceID = generateUID();
    this.store.data.push({
      id: resourceID,
      created_at: Date.now(),
      updated_at: Date.now(),
      ...payload,
    });

    this.store.updated_at = Date.now();

    return resourceID;
  };

  insertMany = async (
    payloads: Array<{ [key: string]: any }>
  ): Promise<string[]> => {
    const resources: string[] = [];

    payloads.forEach(item => {
      const resourceID = generateUID();
      resources.push(resourceID);
      this.store.data.push({
        id: resourceID,
        created_at: Date.now(),
        updated_at: Date.now(),
        ...item,
      });
    });

    this.store.updated_at = Date.now();
    return resources;
  };

  delete = async (id: string): Promise<void> => {
    try {
      this.store.data = this.store.data.filter(item => item.id !== id);
      this.store.updated_at = Date.now();
    } catch (error: unknown) {
      console.error(error);
    }
  };

  update = async (id: string, payload: typeItem): Promise<void> => {
    const newData = this.store.data.map(item => {
      if (item.id === id) {
        item = {
          ...payload,
          updated_at: Date.now(),
        };
      }
      return item;
    });
    this.store.data = newData;
    this.store.updated_at = Date.now();
  };
}

class DBStore implements Store {
  private readonly model: ModelFacade;
  private readonly store: IStore;

  constructor(model: ModelFacade) {
    this.model = model;
    this.store = {
      data: [],
      updated_at: Date.now(),
      created_at: Date.now(),
    };
  }

  readOne = async (id: string): Promise<typeItem | undefined> => {
    const data = await this.model.readOne(id);
    return data ?? undefined;
  };

  readAll = async (): Promise<typeItem[]> => {
    const data = await this.model.readAll();
    return data ?? [];
  };

  insertOne = async (payload: { [key: string]: any }): Promise<string> => {
    const data = await this.model.insertOne(payload);
    return data;
  };

  insertMany = async (
    payloads: Array<{ [key: string]: any }>
  ): Promise<string[]> => {
    // const data = await this.model.insertMany(payloads);
    // return data as string[];
    // TODO: return the data as correct type
    return [];
  };

  delete = async (id: string): Promise<void> => {
    // TODO: delete impl for db store
  };

  update = async (id: string, payload: typeItem): Promise<void> => {
    // TODO: update impl for db store
  };
}

export { InMemoryStore, DBStore, typeStoreNames };
