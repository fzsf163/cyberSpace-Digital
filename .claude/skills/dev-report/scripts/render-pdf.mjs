// Renders an HTML file to PDF via puppeteer's bundled Chromium.
// Run from a directory where puppeteer is installed (npm install puppeteer).
// Usage: node render-pdf.mjs <input.html> <output.pdf>
import puppeteer from "puppeteer";
import path from "path";

const [, , htmlPath, pdfPath] = process.argv;
if (!htmlPath || !pdfPath) {
  console.error("usage: node render-pdf.mjs <input.html> <output.pdf>");
  process.exit(1);
}

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto("file://" + path.resolve(htmlPath), { waitUntil: "networkidle0" });
await page.pdf({
  path: path.resolve(pdfPath),
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
});
await browser.close();
console.log("written:", path.resolve(pdfPath));
