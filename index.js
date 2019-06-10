const request =  require("request-promise");
const fs = require("fs");
const cheerio = require("cheerio");

async function main() {
  const html = await request.get("https://reactnativetutorial.net/css-selectors/lesson6.html");
  fs.writeFileSync("./test.html", html);
  const $ = await cheerio.load(html);

  //attribute selector
  const attr = $('[data-customer="22293"]')
  
  $("h2").each((index, element) => {
    console.log($(element).text());
  });

  console.log(attr.text());
}

main();