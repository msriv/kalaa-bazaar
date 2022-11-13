import { InMemoryStore, DBStore, typeStoreNames } from '../../support/Stores';
import { ServerLogger } from '../../support/Logger';
import { ServiceProvider } from '../../support/ServiceProvider';
import { PostsModel } from './prisma/PostsModel';

interface DBServiceProviderFacade extends ServiceProvider {
  getStore: (store: string) => InMemoryStore | DBStore;
  createStore: (store: typeStoreNames) => void;
}

const Models = {
  posts: PostsModel.getModel(),
  users: PostsModel.getModel(),
};

class PostgreSQLDBServiceProvider implements DBServiceProviderFacade {
  private static sInstance: PostgreSQLDBServiceProvider;
  private static readonly sServiceIdentifier: string = 'DB';
  private mStore: { [store: string]: DBStore };

  private constructor() {
    this.mStore = {};
  }

  start = (): void => {
    ServerLogger.getInstance().info(`${this.getServiceName()} service started`);
  };

  stop = (): void => {
    ServerLogger.getInstance().info(`${this.getServiceName()} service stopped`);
  };

  static getInstance = (): PostgreSQLDBServiceProvider => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!PostgreSQLDBServiceProvider.sInstance)
      PostgreSQLDBServiceProvider.sInstance = new PostgreSQLDBServiceProvider();
    return PostgreSQLDBServiceProvider.sInstance;
  };

  getServiceName = (): string => PostgreSQLDBServiceProvider.sServiceIdentifier;

  getStore = (store: string): DBStore => this.mStore[store];

  createStore = (store: typeStoreNames): void => {
    this.mStore[store] = new DBStore(Models[store]);
  };
}

class InMemoryDBServiceProvider implements DBServiceProviderFacade {
  private static sInstance: InMemoryDBServiceProvider;
  private static readonly sServiceIdentifier: string = 'DB';
  private mStore: { [store: string]: InMemoryStore };

  private constructor() {
    this.mStore = {};
  }

  start = (): void => {
    ServerLogger.getInstance().info(`${this.getServiceName()} service started`);
  };

  stop = (): void => {
    ServerLogger.getInstance().info(`${this.getServiceName()} service stopped`);
  };

  static getInstance = (): InMemoryDBServiceProvider => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!InMemoryDBServiceProvider.sInstance)
      InMemoryDBServiceProvider.sInstance = new InMemoryDBServiceProvider();
    return InMemoryDBServiceProvider.sInstance;
  };

  getServiceName = (): string => InMemoryDBServiceProvider.sServiceIdentifier;

  getStore = (store: string): InMemoryStore => this.mStore[store];

  createStore = (store: typeStoreNames): void => {
    this.mStore[store] = new InMemoryStore();
  };
}

export { PostgreSQLDBServiceProvider, InMemoryDBServiceProvider };
