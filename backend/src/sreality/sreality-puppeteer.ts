/**
 * @deprecated: This file is deprecated. Running puppeteer in Docker is a pain, especially in systems with apple silicon chips
 * and calling the sReality API directly is much easier anyway.
 *
 * Please use functions in ./sreality-api.ts instead.
 */

import puppeteer, { Browser } from "puppeteer";

export const srealityBaseWebsiteUrl =
  "https://www.sreality.cz/en/search/for-sale/apartments/";

type Property = {
  name: string;
  price: string;
  img: string;
};

export async function initPuppeteer() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  return browser;
}

export async function scrapePage(browser: Browser, url: string) {
  // Create a new page
  const page = await browser.newPage();

  // Navigate to the URL
  await page.goto(url, { waitUntil: "networkidle2" });

  console.log("2", page);

  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));

  // Evaluate the page and extract the data
  const properties = await page.evaluate(() => {
    console.log("---");
    console.log("3");

    const propertiesList = document.querySelectorAll(
      ".dir-property-list > .property"
    );
    const properties: Property[] = [];
    console.log("fff", propertiesList.length);
    propertiesList.forEach((div) => {
      const name = div.querySelector("h2 .name")?.textContent;
      const price = div.querySelector(".price > .norm-price")?.textContent;

      const img = div
        .querySelector("[component=property-carousel] img")
        ?.getAttribute("src");

      if (name && price && img) {
        properties.push({ name, price, img });
      }
    });
    return properties;
  });

  // Log the extracted data
  console.log({ properties });

  return properties;
}

async function scrapeSPA() {
  // Launch a headless browser
  console.log("0");
  const browser = await initPuppeteer();
  console.log("0,5");

  const allProperties: Property[] = [];

  for (let i = 1; i < 3; i++) {
    const params = {
      page: i.toString(),
    };

    const url = `${srealityBaseWebsiteUrl}?${new URLSearchParams(params)}`;

    allProperties.push(...(await scrapePage(browser, url)));
  }

  // Close the browser
  await browser.close();

  return allProperties;
}

export default async function scrape() {
  try {
    const properties = await scrapeSPA();

    console.log(`Scraped ${properties.length} properties`);

    return properties;
  } catch (err) {
    console.error(err);
  }
}
