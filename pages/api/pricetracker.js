import puppeteer from "puppeteer";

const priceScraper = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForNetworkIdle({ idleTime: 3, timeout: 10000 });
  await page.waitForSelector("span.a-price-whole");
  const price = await page.$eval("span.a-price-whole", (el) => el.innerText);

  await browser.close();

  return parseInt(price.split(",")[0].replace(/\s/g, ""));
};

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { url, prefPrice } = req.body;
      const price = await priceScraper(url);
      const isUnderPrefPrice = price < parseInt(prefPrice) ? false : true;

      res.json({
        price,
        isUnderPrefPrice,
      });

    } catch (err) {
      res.json({
        price: "Error in backend",
        isUnderPrefPrice: "Reload the page and try again",
      });
    }
  }
}
