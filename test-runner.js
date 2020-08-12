require('dotenv').config()
global.globalData = require('./tests/test-dataset/global-data.json')
const createTestCafe = require("testcafe");
let testcafe = null;
const args = require('yargs').argv;
console.log('Browser: ' + args.browser);
console.log('Environment: ' + args.environment);
console.log('Suite: ' + args.suite);
console.log('Concurrency: ' + args.concurrency);
console.log('Deployment code: '+ args.deploy) 
if(args.deploy > 0 ){
    process.env.DEPLOY = args.deploy
}
else process.env.DEPLOY = null
global.config = require('./main/utils/get-config.js')
process.env.BASE_URL = config.getBaseUrl(args.environment, "xquic")
process.env.TEST_ENV = args.environment
process.env.BROWSER = args.browser
process.env.TIMESTAMP = new Date().getTime();
var runConfig = require('./run-config.json')
console.log("Running - " + runConfig[args.suite])
let files, testFiles = [];
files = runConfig[args.suite];

files.forEach(function(element) {
    testFiles.push('tests/' +element);
  });

createTestCafe('localhost',1337,1338)
    .then(tc => {
        testcafe=tc;
        const runner = testcafe.createRunner();
        return runner
            .src(testFiles)
            .browsers([args.browser])
            // .browsers(['chrome:headless','firefox:headless'])
            .concurrency(args.concurrency)
            .screenshots('./reports/screenshots/', true)
            .reporter([{
                name:'spec', 
                output: 'reports/'+args.environment+'_'+ args.suite + '_header_' +args.deploy+'_'+`${process.env.TIMESTAMP}`+'.txt'
                },
                {
                    name: 'html',
                    output: 'reports/'+args.environment+'_'+ args.suite + '_header_' +args.deploy+'.html'
                },
                {
                    name: 'html',
                    output: 'reports/'+args.environment+'_'+ args.suite + '_header_' +args.deploy+'_'+`${process.env.TIMESTAMP}`+'.html'
                },
            ])
            .run({
                skipJsErrors: true,
                skipUncaughtErrors: true,
                //quarantineMode: true,
                selectorTimeout: 30000,
                assertionTimeout: 30000,
            });
    })
    .then(failedCount => {
        console.log('Tests failed: ' + failedCount);
        testcafe.close();
    });