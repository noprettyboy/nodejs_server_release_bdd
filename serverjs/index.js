var server = require('./server');
var router = require('./router');
var reqHandlers = require('./requestHandlers');

var handle = {};
handle['/'] = reqHandlers.rooturl;
handle['/start'] = reqHandlers.start;
handle['/upload'] = reqHandlers.upload;
handle['/show'] = reqHandlers.show;

handle['html'] = reqHandlers.dealhtmurl;
handle['css'] = reqHandlers.dealcssurl;
handle['js'] = reqHandlers.dealjsurl;
handle['png'] = reqHandlers.dealimgurl;
handle['gif'] = reqHandlers.dealimgurl;
handle['jpg'] = reqHandlers.dealimgurl;
handle['woff'] = reqHandlers.dealimgurl;
handle['json'] = reqHandlers.dealjsonurl;

handle['falsejson'] = reqHandlers.dealfalsejsonurl;


server.start(router.router, handle);