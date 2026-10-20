const express = require("express");
const cors = require("cors");
const path = require("path");
const trees = require("./data/trees.json");
const seeds = require("./data/seeds.json");
const faqs = require("./data/faqs.json");

const app = express();

app.disable("x-powered-by");
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET"],
  })
);

// Serve static files from frontend directory
const frontendPath = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendPath));

app.get("/api/health", (request, response) => {
  response.json({ status: "ok" });
});

// Serve index.html at root path
app.get("/", (request, response) => {
  response.sendFile(path.join(frontendPath, "index.html"));
});

function registerReadOnlyCollection(path, records) {
  app.get(path, (request, response) => {
    response.json(records);
  });

  app.get(`${path}/:id`, (request, response) => {
    const record = records.find((item) => item.id === request.params.id);

    if (!record) {
      return response.status(404).json({ error: "Record not found" });
    }

    response.json(record);
  });
}

registerReadOnlyCollection("/api/trees", trees);
registerReadOnlyCollection("/api/seeds", seeds);
registerReadOnlyCollection("/api/faqs", faqs);

app.use((request, response) => {
  response.status(404).json({ error: "Route not found" });
});

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;

  app.listen(port, () => {
    console.log(`Seeds of Tomorrow API listening on port ${port}`);
  });
}

module.exports = app;