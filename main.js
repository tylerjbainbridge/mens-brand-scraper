var fs = require('fs'),
    split = require('split'),
    async = require('async'),
    _ = require('lodash');


async.parallel([

        function(callback){
            readFile("./text-files/wiki.txt", callback)
        },

        function(callback){
            readFile("./text-files/far-fetch.txt", callback)
        },

        function(callback){
            readFile("./text-files/nordstrom.txt", callback)
        },

        function(callback){
            readFile("./text-files/reddit-spreadsheet.txt", callback);
        },

        function(callback){
            readFile("./text-files/reddit-thread.txt", callback);
        },

        function(callback){
            readFile("./text-files/streetwear-top-50.txt", callback);
        }

    ],

function(err, results) {

    var brands = {};

    results.forEach(function(result){
       result.forEach(function(brand){
           if(typeof brands[brand.toLowerCase().trim()] == 'undefined'){
               brands[brand.toLowerCase().trim()] = {
                   value: 1,
                   name: brand.trim()
               }
           }else{
               brands[brand.toLowerCase().trim()].value ++;
           }
       })
    });

    var brandArray = [];

    Object.keys(brands).forEach(function (key) {
        // do something with obj[key]
        //console.log(key + ": " + brands[key].value);
        //brandArray.push(_.capitalize(brands[key].name));
        if(brands[key].name.length > 1)
            brandArray.push(brands[key].name);
    });

    var finished = '';

    brandArray = _.sortBy(brandArray, function(o) { return o; });
    brandArray = _.sortedUniq(brandArray);

    //finished = '{ "brands" : [';
    var i = 0;

    brandArray.forEach(function(brand){
        i++;

        /*var temp = '{"name" : "' + brand + '"}';

        if(i < brandArray.length){
            finished += temp + ',\n';
        }else{
            finished += temp + '\n]\n}';
        }*/

        finished += brand + '\n';

    });

    fs.writeFile('output.txt', finished, function(err){
        if(err){
            throw err;
        }else{

            /*fs.readFile('output.txt', function(err, data){
                var json;
               try{
                   json = JSON.parse(data);
               }catch(e){
                   console.log(e);
               }
            });*/

            console.log(brandArray.length + " brands added to output.txt");
        }
    });
});

function readFile(file, callback) {
    var brands = [];

    fs.createReadStream(file)

        .pipe(split())                          //first the stream splits on '/n' and provides the data to the transformer function.

        .on('data', function (line) {           //the transformer function receives the data from the piping and tries to parse it.
            brands.push(line);
        })
        .on('close', function () {              //when the files is closed, insert the array of javascript objects in a bulk insert.c
            callback(null,brands);
        });
}