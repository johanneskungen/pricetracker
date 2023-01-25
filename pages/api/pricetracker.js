import puppeteer from "puppeteer";

const priceScraper = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page
    .waitForNetworkIdle({ idleTime: 3, timeout: 10000 })
  await page.waitForSelector("span.a-price-whole");
  const price = await page.$eval("span.a-price-whole", (el) => el.innerText);

  await browser.close();

  return price;
};

export default async function handler(req, res) {
  const { url, prefPrice } = req.body;
  const priceResposne = await priceScraper(url);
  const price = priceResposne.split(",")[0].replace(/\s/g, "");
  const isUnderPrefPrice = parseInt(price) < parseInt(prefPrice) ? false : true;

  await res.json({
    price,
    isUnderPrefPrice,
  });
}
