
import {   DeployCodeHeader } from '../../main/utils/deploy-code-header.js'

const customHeader = new DeployCodeHeader()
import { Selector } from "testcafe"

var data;
var path = require('path')

var xml2js = require('xml2js');
var xpath = require("xml2js-xpath");

var testfile = path.basename(__filename).split('.')[0]
var Fakerator = require("fakerator");

fixture `Google API`
    //.page `${process.env.BASE_URL}`
    .requestHooks(customHeader)

test
    .before(async () => {
        data = config.getTestData(__dirname, __filename)
    })
    (testfile + ': Google API - integration', async t => {

        await new Promise((resolve) => {
            //create an order using integration for that user using package
            var request = require("request");
            var body =    ''; 

            //const sampleHeaders = {
             // };
            request.get({
                    url: "https://www.google.com/",
                    //headers : sampleHeaders,
                    method: "GET",
                    body: body
                },
                async function (error, response, body) {
                    if(error){
                        console.log(error)
                    }
                    console.log(response.statusCode)
                    var parser = new xml2js.Parser();
                     parser.parseString(body, function (err, result) {
                        //var idValue = xpath.find(result, "//b:OrderID")[0];
                        //var isException = xpath.find(result, "//b:ExceptionGUID")[0];
                        console.log("No exception recieved while placing order: ")
                        //console.log(idValue);
                        //process.env.OrderID = idValue;
                    })
                    resolve("success")
                }) 
        })
        console.log("Completed")
         
    }) //end of test
