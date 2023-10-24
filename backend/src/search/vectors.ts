import { LocalIndex, MetadataTypes } from "vectra";
import path from "path";
import OpenAI from "openai";
import dotenv from "dotenv";
import { getRealEstateItems } from "../sreality/sreality-service";
import { prisma } from "../db";
import { RealEstate } from "@prisma/client";

dotenv.config();

export default class VectraHandler {
  private vectraIndex: LocalIndex;
  openai: OpenAI;

  constructor(vectraIndexPath: string = "main") {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    this.vectraIndex = new LocalIndex(
      path.join(__dirname, "..", "..", "vector-storage", vectraIndexPath)
    );
    this.makeSureVectraIsReady();
  }

  async getIndexStats() {
    await this.makeSureVectraIsReady();

    return await this.vectraIndex.getIndexStats();
  }

  async makeSureVectraIsReady() {
    if (!(await this.vectraIndex.isIndexCreated())) {
      await this.vectraIndex.createIndex();
    }
  }

  async getVectors(texts: string[]) {
    const response = await this.openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: texts,
    });
    return response.data.map((item) => item.embedding);
  }

  async addItemsToVectra(
    metadata: Record<string, MetadataTypes>[],
    vectors: number[][]
  ) {
    await this.makeSureVectraIsReady();
    const promises = vectors.map(async (vector, index) => {
      await this.vectraIndex.insertItem({
        vector,
        metadata: metadata[index],
      });
    });

    await Promise.all(promises);
  }

  async vectorizeAndStore(
    metadata: Record<string, MetadataTypes>[],
    vectorizables: string[]
  ) {
    console.log("vectorizing and storing");
    const vectors = await this.getVectors(vectorizables);

    console.log("vectors fetched");

    await this.addItemsToVectra(metadata, vectors);
  }

  async query<Metadata>(text: string, limit = 3): Promise<Metadata[]> {
    await this.makeSureVectraIsReady();

    const vector = (await this.getVectors([text]))[0];

    const results = await this.vectraIndex.queryItems(vector, limit);

    console.log(
      results.map((item) => ({ md: item.item.metadata.id, score: item.score }))
    );

    results.sort((a, b) => b.score - a.score);

    return results.map((item) => item.item.metadata as Metadata);
  }
}
