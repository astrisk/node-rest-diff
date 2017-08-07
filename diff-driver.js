/**
 * Created by qiushengzhang on 2017/7/27.
 */
var apiDiff = require('./lib/index.js');
var program = require('commander');

//定义参数,以及参数内容的描述
program
    .version('0.0.1')
    .usage('[options] [value ...]')
    .option('-m, --method <string>', 'http request method')
    .option('-a, --aUrl <string>', 'a url')
    .option('-b, --bUrl <string>', 'b url')
    .option('-p, --requestArgs <string>', 'request args')
    .option('-n, --nextPageFlag <string>', 'next page flag')
    .option('-c, --pageCount <n>', 'next page count',parseInt)

//解析commandline arguments
program.parse(process.argv)

// //输出结果
// console.info('--method:')
// console.log(program.method);
//
// console.info('-- a targetUrls:')
// console.log(program.aUrl)
//
// console.info('-- b targetUrls:')
// console.log(program.bUrl)
//
// console.info('--requestArgs:')
// console.log(program.requestArgs)
//
// console.info('--nextPageFlag:')
// console.log(program.nextPageFlag)
//
// console.info('--pageCount:')
// console.log(program.pageCount)
//
//


var args = {
    headers:{
        "Content-Type": "application/json"
    }
};

apiDiff.add(program.method, program.aUrl, program.bUrl, args, program.nextPageFlag, program.pageCount);

apiDiff.compare();