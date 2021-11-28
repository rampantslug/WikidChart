const express = require('express');
const router = express.Router();
const https = require('https');

router.get('/tweets', (req, res) => {

    // This needs to be triggered from a button click with data request

});


function getViaWikiText(){

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


router.post('/addTweet', (req, res) => {
    res.end('NA');
});

module.exports = router;