const request = require("request-promise");
const cheerio = require("cheerio");

const url = "https://mexicocity.craigslist.org/d/software-cc-sc-etc./search/sof"

const scrapeSample = {
  title: "",
  description: "",
  date: new Date("2019-06-10"),
  url: "",
  hood: "",
  address: "",
  compensation: ""
}

const scrapeResults = [];

async function scrapeCraigsList() {
  //In the next line, request.get returns a promise so we can use async/await or promises
  try {
    const htmlResult = await request.get(url);
    const $ = await cheerio.load(htmlResult);
    
    $(".result-info").each((index, element) => {
      const resultTitle = $(element).children(".result-title");
      const title = resultTitle.text()
      const url = resultTitle.attr("href");
      const datePosted = new Date(
        $(element)
          .children("time")
          .attr("datetime")
      );
      const hood =  $(element).find(".result-hood").text();

      const scrapeResult = { title, url, datePosted, hood };
      scrapeResults.push(scrapeResult);

      // console.log(scrapeResults)
    })

  } catch {
    console.error(err);
  }
  
}

scrapeCraigsList();