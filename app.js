import express from "express";
import errorMiddleware from "./middlewares/error.middleware.js";
import OpenApiValidator from "express-openapi-validator";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

//import routers
import staffRouter from "./routers/staff.router.js";
import adminRouter from "./routers/admin.router.js";
import flightsRouter from "./routers/flights.router.js";
import planesRouter from "./routers/planes.router.js";
import runwaysRouter from "./routers/runways.router.js";
import passengersRouter from "./routers/passengers.router.js";

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
app.use(v1 + "/staff", staffRouter);
app.use(v1 + "/admin", adminRouter);
app.use(v1 + "/flights", flightsRouter);
app.use(v1 + "/planes", planesRouter);
app.use(v1 + "/runways", runwaysRouter);
app.use(v1 + "/passengers", passengersRouter);

// Use a global customized error middleware
app.use(errorMiddleware);

export default app;
