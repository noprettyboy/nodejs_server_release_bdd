function router(handle, pathname, req, res, postdata) {
// console.log(req.method);
console.log('into the router request for->'+pathname);
// var newpathname = pathname;
// var newpostdata = postdata;
// console.log(pathname.lastIndexOf('.'));
var extendNM = pathname.substr(pathname.lastIndexOf('.')+1);
// zzw old begin
console.log('re:'+extendNM.lastIndexOf('/'));
if (extendNM.lastIndexOf('/')>0) {
	extendNM = 'falsejson';
}
console.log('et:'+extendNM);
// zzw old end



// var cssFileRegex = new RegExp('^/css/.*css?$');
// if (cssFileRegex.test(pathname)) {
// newpathname = 'css';
// newpostdata = pathname;
// }

if (typeof handle[extendNM] === 'function') {
handle[extendNM](req, res, postdata, pathname);
} else {
console.log('no request handle found for->'+pathname);
res.writeHead(404, {'Content-Type':'text/plain'});
res.write('404 not found!');
res.end();
}	
}

exports.router = router;