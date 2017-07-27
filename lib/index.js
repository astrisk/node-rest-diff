require('colors')
var async = require('async');
var Client = require('node-rest-client').Client;
var jsondiffpatch = require('jsondiffpatch');

var tasks = [];
var nextUrl1 = "";
var nextUrl2 = "";
var pagecount = 2;
var nextPageField = "next";

var add = function(method, targetUrl1, targetUrl2, args) {
  tasks.push({ method: method, targetUrl1: targetUrl1, targetUrl2: targetUrl2, args: args });
}

var compare = function() {
  for (var i in tasks) {
    var task = tasks[i];
    diff(task.method, task.targetUrl1, task.targetUrl2, task.args);
  }
}


var diff = function(method, targetUrl1, targetUrl2, args) {

  var client = new Client();
  var beforeStatusCode = "";
  var beforeResponse = "";
  var afterStatusCode = "";
  var afterResponse = "";

  client.registerMethod("reqTarget1", targetUrl1, method);
  client.registerMethod("reqTarget2", targetUrl2, method);

  async.series([

    function(callback) {
      client.methods.reqTarget1(args, function(data, response) {
        beforeStatusCode = response.statusCode;
        beforeResponse = data;
        if(data.hasOwnProperty(nextPageField)){
            nextUrl1 = data[nextPageField];
        }
        callback(null);
      });
    },

    function(callback) {
      client.methods.reqTarget2(args, function(data, response) {
        afterStatusCode = response.statusCode;
        afterResponse = data;
        if(data.hasOwnProperty(nextPageField)){
            nextUrl2 = data[nextPageField];
        }

        callback(null);
      });
    }

  ], 

  function(callback) {
    var jsonDiff = jsondiffpatch.diff(beforeResponse, afterResponse);
    toConsole(jsonDiff, method, targetUrl1, targetUrl2, beforeStatusCode, beforeResponse, afterStatusCode, afterResponse);

    if(pagecount > 0 && nextUrl2 != "" && nextUrl1 != ""){
        pagecount--;
        diff(method, nextUrl1, nextUrl2, args);
    }
  });

}

var toConsole = function(diff, method, targetUrl1, targetUrl2, beforeStatusCode, beforeResponse, afterStatusCode, afterResponse) {
  console.log('Before target   : ' + method.cyan + ' ' +  targetUrl1.cyan);
  console.log('After target    : ' + method.cyan + ' ' +  targetUrl2.cyan);
  console.log('Before response : [' + beforeStatusCode + '] ' + JSON.stringify(beforeResponse));
  console.log('After response  : [' + afterStatusCode + '] ' + JSON.stringify(afterResponse));
  if (diff != undefined) {
    console.log('--------------------'.inverse);
    jsondiffpatch.console.log(diff);
    console.log('--------------------'.inverse);
    console.log('dose note match.'.red);
  } else {
    console.log('match.'.green);
  }
  console.log('--------------------');
}

var toHtml = function() {}

module.exports = {
    add: add,
    compare: compare
};

