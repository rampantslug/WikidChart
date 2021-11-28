const cheerio = require('cheerio');
const request = require("request-promise");


function getTableFromWikiPage(url) {

    console.log('Wikipedia Url to fetch from: ' + url);

    // Get wikipage and load into Cheerio
    // Break table table into tokens to form structure like...
    const sampleData = '{ "RecordProgression" : [' +
        '{ "mark":"1.46" , "athlete":"Nancy Voorhees" , "date":"20 May 1922", "venue":"Simsbury"},' +
        '{ "mark":"1.485" , "athlete":"Elizabeth Stine" , "date":"26 May 1923", "venue":"Leonia"},' +
        '{ "mark":"1.485" , "athlete":"Sophie Eliott-Lynn" , "date":"6 August 1923", "venue":"Brentwood"},' +
        '{ "mark":"1.524" , "athlete":"Phyllis Green" , "date":"11 July 1925", "venue":"London"},' +
        '{ "mark":"1.552" , "athlete":"Phyllis Green" , "date":"2 August 1926", "venue":"London"},' +
        '{ "mark":"1.58" , "athlete":"Ethel Catherwood" , "date":"6 September 1926", "venue":"Regina"},' +
        '{ "mark":"1.58" , "athlete":"Lien Gisolf" , "date":"3 July 1928", "venue":"Brussels"},' +
        '{ "mark":"1.595" , "athlete":"Ethel Catherwood" , "date":"5 August 1928", "venue":"Amsterdam"},' +
        '{ "mark":"1.605" , "athlete":"Lien Gisolf" , "date":"18 August 1929", "venue":"Maastricht"},' +
        '{ "mark":"1.62" , "athlete":"Lien Gisolf" , "date":"12 June 1932", "venue":"Amsterdam"},' +
        '{ "mark":"1.65" , "athlete":"Jean Shiley" , "date":"7 August 1932", "venue":"Los Angeles"},' +
        '{ "mark":"1.65" , "athlete":"Mildred Didrikson" , "date":"7 August 1932", "venue":"Los Angeles"},' +
        '{ "mark":"1.66" , "athlete":"Dorothy Odam" , "date":"29 May 1939", "venue":"Brentwood"},' +
        '{ "mark":"1.66" , "athlete":"Esther van Heerden" , "date":"29 March 1941", "venue":"Stellenbosch"},' +
        '{ "mark":"1.66" , "athlete":"Ilsebill Pfenning" , "date":"27 July 1941", "venue":"Lugano"},' +
        '{ "mark":"1.71" , "athlete":"Fanny Blankers-Koen" , "date":"30 May 1943", "venue":"Amsterdam"},' +
        '{ "mark":"1.72" , "athlete":"Sheila Lerwill" , "date":"7 July 1951", "venue":"London"},' +
        '{ "mark":"1.73" , "athlete":"Aleksandra Chudina" , "date":"22 May 1954", "venue":"Kiev"},' +
        '{ "mark":"1.74" , "athlete":"Thelma Hopkins" , "date":"5 May 1956", "venue":"Belfast"},' +
        '{ "mark":"1.75" , "athlete":"Iolanda Balaș" , "date":"14 July 1956", "venue":"Bucharest"},' +
        '{ "mark":"1.76" , "athlete":"Mildred McDaniel" , "date":"1 December 1956", "venue":"Beijing"},' +
        '{ "mark":"1.76" , "athlete":"Iolanda Balaş" , "date":"13 October 1957", "venue":"Bucharest"} ]}';



    /* const result = await request.get(url);
    // Get first table from page
    const $ = cheerio.load(result);
    //var $table_obj = $('table')[0];

    console.log($('table > thead > tr > th'));

    $("table > thead > tr").each((index, element) => {
        console.log('Header: ' + $(element).find("td"));
      }); */

    return sampleData;
}

function processTable(cheerio_table, remove_tags = []) {

    let columns = [];
    let items = {};




    /*  // preprocessing, eg. remove tags
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
     }); */

    return items;
}


function parseViaWikiApi() {

    /*     const url = "https://en.wikipedia.org/w/api.php?" +
        new URLSearchParams({
            origin: "*",
            action: "parse",
            page: "Pet door",
            format: "json",
        });
    
    try {
        const req = await fetch(url);
        const json = await req.json();
        console.log(json.parse.text["*"]);
    } catch (e) {
        console.error(e);
    } */

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




    /*const str = [{
        "name": "Lachie",
        "msg": "My first tweet!",
        "username": "rampantslug"
    }];
    res.end(JSON.stringify(str));*/
}

module.exports = getTableFromWikiPage;