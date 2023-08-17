import "reflect-metadata";
import { ExpressLoader } from "./app";
import { envConfig } from "./config/env";

const app = new ExpressLoader(envConfig.PORT);

const startServer = () => {
  app.initializeMiddlewares();
  app.listen();
};

startServer();
