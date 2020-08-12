var config = require('../../config.json')

function getBaseUrl(env, key){
    return config[env][key]
}

function getConfig(env){
  return config[env]
}

function getTestData(dirname, testfile){
    var commondata, testdata, data, testfile;
    var path = require('path');
    var fs = require('fs');
    var testfile = path.basename(testfile).split('.')[0];
    var datadir = dirname.split(path.sep).pop();
    var env = `${process.env.TEST_ENV}`
    commondata = path.resolve(dirname,'../test-dataset/'+env+'/'+datadir+'/common.json');
    testdata = path.resolve(dirname,'../test-dataset/'+env+'/'+datadir+'/'+testfile+'.json');
    try {
      if (fs.existsSync(testdata)) {
        data = require(path.resolve(dirname,'../test-dataset/'+env+'/'+datadir+'/'+testfile+'.json'))
        data = mergeJson({}, global.globalData, data)
      }
      else if (fs.existsSync(commondata)) {
        commondata = require(path.resolve(dirname,'../test-dataset/'+env+'/'+datadir+'/common.json'))
        data = mergeJson({}, global.globalData, commondata)
      }
      else{
        data = global.globalData;
      }
    } catch(err) {
      console.error(err)
    }
    return data;
}

 function getKey(){
   var test='newtest'
   const Cryptr = require('cryptr');
   const cryptr = new Cryptr(test);
    var value;
        var sql = require('mysql');
        var pool = sql.createConnection({
            host: cryptr.decrypt('b8d0fa78e06f20875c07e414abc031d3731ffd5f653b56b2ba5f54c1f2b894208d2a60bd73808e0afa'),
            database: cryptr.decrypt('6be5e9dfff79aecdfe021b2d3fd82293eee2735fe3777fe7'),
            user:cryptr.decrypt('919043a23cd1b3376e1f67e4f02b8e75c954168e7373b07d5d172febd8'),
            password:cryptr.decrypt('74697138eadd6c791dbe8c403fc49ab3a910e05c5269269ad4150c'),
            port:3306
        });
        pool.connect()
        pool.query('use swest_db;',function(err, result, fields){
                if(err) throw err;
                pool.query('select * from javelin where keyset=\'SWEST_KEY\';',function(err, result, fields){
                  if(err) throw err;
                  value = `${result[0].keyvalue}`
                  process.env.SWEST_KEY=value
                  pool.end();
            });
          });
       return value; 
}

function mergeJson(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
}
module.exports = {getBaseUrl, getTestData, getConfig, getKey}

