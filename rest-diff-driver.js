/**
 * Created by qiushengzhang on 2017/7/26.
 */
var apiDiff = require('./lib/index.js');

var args = {
    headers:{
        "Content-Type": "application/json"
    }
};

var target1 = "https://test1-api.dongqiudi.com/app/tabs/iphone/1.json?mark=gif&version=568";
var target2 = "http://test1-article.dongqiudi.com/tab/top?mark=gif";
// 第4个参数为翻页字段，根据该字段从response中提取翻页的URL
// 第5个参数为翻页次数，即翻几次
apiDiff.add('GET', target1, target2, args, "next", 3);

apiDiff.compare();


