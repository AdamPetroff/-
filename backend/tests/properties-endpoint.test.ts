import { getRealEstateItems } from "../src/sreality/sreality-service";
import request from "supertest";
import { app } from "../src/index";
import { prisma } from "../src/db";

beforeAll(async () => {
  // Manually insert some properties
  await prisma.realEstate.createMany({
    data: [
      {
        name: "Test Property 1",
        priceCzk: 1000000,
        imgSrc: "https://example.com/img1.jpg",
        url: "https://example.com/property1",
        locality: "Prague",
      },
      {
        name: "Test Property 2",
        priceCzk: 2000000,
        imgSrc: "https://example.com/img2.jpg",
        url: "https://example.com/property2",
        locality: "Brno",
      },
    ],
  });
});

test("properties endpoint returns correct data", async () => {
  const res = await request(app).get("/properties?page=1&pageSize=2");

  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveLength(2);
  expect(res.body[0].name).toEqual("Test Property 1");
  expect(res.body[1].name).toEqual("Test Property 2");
});
