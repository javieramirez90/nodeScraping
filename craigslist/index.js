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



async function scrapeJobHeader(){
  let scrapeResults = [];
  //In the next line, request.get returns a promise so we can use async/await or promises
  try {
    const htmlResult = await request.get(url);
    const $ = await cheerio.load(htmlResult);
    
    $(".result-info").each((index, element) => {
      const resultTitle = $(element).children(".result-title");
      const title = resultTitle.text()
      const url = resultTitle.attr("href");
      const datePosted = new Date($(element).children("time").attr("datetime"));
      const hood =  $(element).find(".result-hood").text();

      const scrapeResult = { title, url, datePosted, hood };
      // console.log(scrapeResult)
      scrapeResults.push(scrapeResult);

      return scrapeResults
    })

  } catch {
    console.error(err);
  }
}

async function scrapeDescription(jobsWithHeaders) {
  return await Promise.all(
    jobsWithHeaders.map(async job => {
    const htmlResult = await request.get(job.url);
    const $ = await cheerio.load(htmlResult);
    $(".print-qrcode-container").remove();
    job.description = $("#postingbody").text();
    job.address = $("div.mapaddress").text();
    return job;
  })
  );
}

async function scrapeCraigsList() {
   const jobsAndHeaders =  scrapeJobHeader()
  const jobsFullData = await scrapeDescription(jobsAndHeaders);

  console.log(jobsFullData)
}

scrapeCraigsList();