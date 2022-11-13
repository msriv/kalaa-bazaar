interface ServiceProvider {
  start: () => void;
  stop: () => void;
  getServiceName: () => string;
}

export { ServiceProvider };
