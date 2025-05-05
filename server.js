import app from "./app.js";
import prisma from "./db.js";

const port = 3000;
const hostname = "0.0.0.0";

prisma
  .$connect()
  .then(() => {
    // Start the server on given port and hostname, for production should be stored in .env files
    app.listen(port, hostname, () => {
      console.log("Executed when server is started");
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  })
  .catch((err) => {
    console.error("Cannot connect to the database", err);
  });
