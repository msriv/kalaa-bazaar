import { ServerLogger } from '../../support/Logger';
import { ServiceProvider } from '../../support/ServiceProvider';

interface InferServiceProviderFacade extends ServiceProvider {}

class InferServiceProvider implements InferServiceProviderFacade {
  private static sInstance: InferServiceProvider;
  private static readonly sServiceIdentifier: string = 'Infer';

  start = (): void => {
    ServerLogger.getInstance().info(`${this.getServiceName()} service started`);
  };

  stop = (): void => {
    ServerLogger.getInstance().info(`${this.getServiceName()} service stopped`);
  };

  static getInstance = (): InferServiceProvider => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!InferServiceProvider.sInstance)
      InferServiceProvider.sInstance = new InferServiceProvider();
    return InferServiceProvider.sInstance;
  };

  getServiceName = (): string => InferServiceProvider.sServiceIdentifier;
}

export { InferServiceProvider };
