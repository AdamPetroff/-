import express from "express";
import {
  fetchAndSavePropertiesIfNecessary,
  getRealEstateItems,
} from "./sreality/sreality-service";
import dotenv from "dotenv";
import {
  searchProperties,
  vectorizePropertiesIfPossible,
} from "./search/real-estate-vectors";
const cors = require("cors");
dotenv.config();

export const app = express();

app.use(cors());

const port = 3000;

let propertiesInDb = 0;

if (process.env.NODE_ENV !== "test") {
  fetchAndSavePropertiesIfNecessary()
    .then((count) => (propertiesInDb = count))
    .then(vectorizePropertiesIfPossible);
}

app.get("/", async (req, res) => {
  res.status(200).send("Hello World!");
});

// NOTE: This is a separate endpoint from /properties because current search solution doesn't support pagination, so it doesn't make sense for it to be the same endpoint
app.get("/search", async (req, res) => {
  const search = req.query.search?.toString();

  if (!search) {
    res.status(400).send("Search query is required");
    return;
  }

  const items = await searchProperties(search);

  res.json({
    items,
  });
});

app.get("/properties", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 20;

  const items = await getRealEstateItems(page, pageSize);
  const totalItems = propertiesInDb;

  // const nextPage = page * pageSize < totalItems ? page + 1 : null;
  // const previousPage = page - 1 > 0 ? page - 1 : null;

  res.json({
    items,
    totalItems,
    totalPages: Math.ceil(totalItems / pageSize),
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
