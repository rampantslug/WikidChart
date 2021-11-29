const cheerio = require('cheerio');
const request = require("request-promise");

const getTableFromWikiPage = async (url) =>{

    console.log('Wikipedia Url to fetch from: ' + url);

    // Get wikipage and load into Cheerio
    // Break table table into tokens to form structure like...

    const result = await request.get(url);
    // Get first table from page
    const $ = cheerio.load(result);
    const tableData = processTable($);
   /*  console.log($('table > thead > tr > th'));

    $("table > thead > tr").each((index, element) => {
        console.log('Header: ' + $(element).find("td"));
      }); */ 
    
    return tableData;
}

// 2nd attempt at parsing table data using Cheerio
// This looks for the <table> element in the html and then proceeds to break up the table
// It seemed promising but despite getting the jquery in Chromes console to correctly return a row,
// I couldnt for the life of me replicate it within this code
const processTable = (cheerio_table, remove_tags = []) => {

    let columns = [];
    let items = {};


      // preprocessing, eg. remove tags
      if (remove_tags.length) {
         remove_tags.forEach(tag => {
             cheerio_table(tag).replaceWith('');
         });
     } 
 
     // get columns
     cheerio_table('thead tr th').each((index, el) => {
         columns.push(cheerio_table(el).text());
         console.log('Table header: ' + cheerio_table(el).text());
     });
 
     console.log(columns);
 
     // Iterate through each row
     cheerio_table('tr').each((tr_index, tr) => {
 
         let item = {};
         // console.log('tr: ', cheerio.load(tr).html() );
         cheerio_table('td:not([colspan])', tr).each((index, td) => {
             item[columns[index]] = cheerio.load(td).text();
         });
 
         // adding item into the items object	
         if (Object.entries(item).length !== 0) {
             items[tr_index] = item;
         }
         // Iterate through each cell of the row
         //$
 
         //const row = link.attribs.href;
         //console.log(row);
     }); 

    return items;

}


// This function was an attempt to use the Wikipedia API to get table data
// Unfortunately I quickly found a table that did not conform to the documented structure of
// {| table data |}
// And the requirement of writing a parser to account for what could be put in a cell seemed 
// like a monumental task
const parseViaWikiApi = () => {

    const oldUrl = 'https://en.wikipedia.org/w/api.php?action=parse&page=Women%27s_high_jump_world_record_progression&contentmodel=wikitext&prop=wikitext&format=json';

    //Women\'s_high_jump_world_record_progression

    const url = "https://en.wikipedia.org/w/api.php?" +
        new URLSearchParams({
            origin: "*",
            action: "parse",
            page: "Toby_McLean",
            format: "json",
            prop: "wikitext",
            contentmodel: "wikitext"
        });

    console.log(url);

    https.get(url, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {

            var json = JSON.parse(data);
            var title = json.parse.title;
            var pageId = json.parse.pageid;
            var text = json.parse.wikitext['*'];

            console.log(title);
            console.log(pageId);
            console.log(text);

            const regex = /\{\|[\s\S]\|\}/g;
            //const regex = /\{\|\s*(.*?)\s*\|\}/g;
            //var gimmeetable = JSON.parse(text);
            //  console.log(gimmeetable);

            //const nextTest = String(text);
            //console.log(nextTest);

            const test = String(text).match(regex);
            var start = String(text).indexOf('\{\|');
            var end = String(text).indexOf('|}');


            console.log('Regex result is......' + test);
            console.log('Table start location ' + start);
            console.log('Table end location ' + end);

            var tableData = String(text).slice(start, end);

            console.log('table' + tableData);

        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });


}

module.exports = getTableFromWikiPage;