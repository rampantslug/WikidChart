const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const wikiParser = require('./wikiParser.js');

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

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



app.post('/', function(request, response) {
    console.log('POST /');

    const wikiUrl = request.body;
    console.log(wikiUrl);
    // Launch wikiParser on requested URL
    // Unfortunately this doesnt work at the moment so we are just returning sampleData
    //const tableData = wikiParser(wikiUrl);
    //response.json(tableData);

    response.json(sampleData);
    response.end();
  })


const PORT = 4000; // Backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
