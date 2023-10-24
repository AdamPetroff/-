import { prisma } from "../db";
import { _sRealityApiFetchProperties, fetchProperties } from "./sreality-api";

export async function fetchAndSavePropertiesIfNecessary() {
  const count = await prisma.realEstate.count();

  if (count > 0) {
    return count;
  }

  const properties = await fetchProperties(500, "sale", "apartment");

  const propertiesToSave = properties.map((property) => ({
    name: property.name,
    priceCzk: property.price || null,
    imgSrc: property.img,
    url: property.url,
    locality: property.locality,
  }));
  const res = await prisma.realEstate.createMany({ data: propertiesToSave });

  return res.count;
}

export async function getRealEstateItems(
  page: number = 1,
  pageSize: number = 20
) {
  const skip = (page - 1) * pageSize;

  const realEstateItems = await prisma.realEstate.findMany({
    skip: skip,
    take: pageSize,
  });
  return realEstateItems;
}
