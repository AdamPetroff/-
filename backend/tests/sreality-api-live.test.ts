import {
  _sRealityApiFetchProperties,
  fetchProperties,
} from "../src/sreality/sreality-api";

describe("Scrape real estate properties", () => {
  test("test api returns the expected response", async () => {
    const result = await _sRealityApiFetchProperties(3, "sale", "apartment");
    result._embedded;
    expect(result).toHaveProperty("_embedded");

    expect(result._embedded).toHaveProperty("estates");

    expect(Array.isArray(result._embedded.estates)).toBeTruthy();

    expect(result._embedded.estates.length).toEqual(3);

    expect(result._embedded.estates[0]).toHaveProperty("name");
    expect(result._embedded.estates[0]).toHaveProperty("price_czk");
    expect(result._embedded.estates[0]).toHaveProperty("_links");

    expect(result._embedded.estates[0].price_czk).toHaveProperty("value_raw");
    expect(result._embedded.estates[0].price_czk.value_raw).toBeGreaterThan(0);

    expect(result._embedded.estates[0]._links).toHaveProperty("images");
    expect(
      Array.isArray(result._embedded.estates[0]._links.images)
    ).toBeTruthy();
    expect(result._embedded.estates[0]._links.images[0]).toHaveProperty("href");
  });

  test("test scraping service returns the expected result", async () => {
    const result = await fetchProperties(3, "sale", "apartment");

    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toEqual(3);

    for (let i = 0; i < result.length; i++) {
      expect(result[i]).toHaveProperty("name");
      expect(result[i]).toHaveProperty("price");
      expect(result[i]).toHaveProperty("img");
      expect(result[i]).toHaveProperty("url");
      console.log(result[i].url);

      expect(result[i].price).toBeGreaterThan(0);
    }
  });
});
