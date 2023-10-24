import { RealEstate } from "@prisma/client";
import VectraHandler from "./vectors";
import { prisma } from "../db";
import { Estate } from "../sreality/types";
import { ITEMS_TO_FETCH } from "../constants";

type RealEstateMetadata = {
  id: number;
};

function propertyToMetadata(property: RealEstate): RealEstateMetadata {
  return {
    id: property.id,
  };
}

function propertyToVectorizable(property: RealEstate): string {
  return `${property.name} for ${property.priceCzk} CZK. Locality: ${property.locality}`;
}

export async function vectorizePropertiesIfPossible() {
  if (!process.env.OPENAI_API_KEY) {
    console.log("OPENAI_API_KEY not set, skipping vectorization");
    return;
  }

  const vectraHandler = new VectraHandler();
  const indexStats = await vectraHandler.getIndexStats();
  if (indexStats.items >= ITEMS_TO_FETCH) {
    return;
  }

  console.log("vectorizing properties process started");

  const properties = await prisma.realEstate.findMany();

  const [metadata, vectorizables] = properties.reduce(
    (acc, property) => {
      acc[0].push(propertyToMetadata(property));
      acc[1].push(propertyToVectorizable(property));
      return acc;
    },
    [[], []] as [RealEstateMetadata[], string[]]
  );

  console.log("Vectorizing and storing properties...");
  await vectraHandler.vectorizeAndStore(metadata, vectorizables);
  console.log("Done vectorizing and storing properties.");
}

export async function boringSearchProperties(searchString: string) {
  const properties = await prisma.realEstate.findMany({
    take: 20,
    where: {
      OR: [
        {
          name: {
            contains: searchString,
          },
        },
        {
          locality: {
            contains: searchString,
          },
        },
      ],
    },
  });

  return properties;
}

export async function searchProperties(searchString: string) {
  if (!process.env.OPENAI_API_KEY) {
    return await boringSearchProperties(searchString);
  }
  const vectraHandler = new VectraHandler();

  const results = await vectraHandler.query<RealEstateMetadata>(
    searchString,
    20
  );

  const ids = results.map((result) => result.id);

  const properties = await prisma.realEstate.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  properties.sort((a, b) => {
    return ids.indexOf(a.id) - ids.indexOf(b.id);
  });

  return properties;
}
