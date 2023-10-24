import VectraHandler from "../src/search/vectors";

describe("Vector storage and querying", () => {
  const vectra = new VectraHandler("tests");

  afterAll(async () => {
    await vectra.vectraIndex.deleteIndex();
  });

  test("test vectorizing and querying", async () => {
    const metadatas = [{ text: "test1" }, { text: "test2" }, { text: "test3" }];
    const vectorizables = metadatas.map((metadata) => metadata.text);

    await vectra.vectorizeAndStore(metadatas, vectorizables);

    const results = await vectra.query<{ text: string }>("test2", 1);

    console.log(results);

    expect(results.length).toEqual(1);
    expect(results[0].text).toEqual("test2");
  });
});
