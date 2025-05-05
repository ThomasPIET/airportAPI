import express from "express";
import usersRouter from "./routers/users.router.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import OpenApiValidator from "express-openapi-validator";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();
app.use(express.json());
const v1 = "/api/v1";

const swaggerDocument = YAML.load("./openapi-main.yaml");
app.use(v1 + "/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  OpenApiValidator.middleware({
    apiSpec: "./openapi-main.yaml",
    validateRequests: true,
    validateResponses: false,
  })
);

app.use(v1 + "/users", usersRouter);

// Use a global customized error middleware
app.use(errorMiddleware);

export default app;
