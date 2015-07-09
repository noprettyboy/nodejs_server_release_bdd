// var less=require('less');
// var fs=require('fs');
// buffers = fs.readFileSync('././src/css/less/main.less');
// str = buffers.toString();
// less.render(str, function(e, css){
// 	console.log(e);
// 	console.log(css);
// 	fs.writeFile('././src/css/main2.css',css,function(err){
// 		if (!err) {
// 		console.log('it is replaced!');
// 		}
// 	});
// });
var exec = require('child_process').exec;
console.log("less action - begin");
var child = exec('lessc src/css/less/main.less src/css/main2.css', function(err,out) { 

  console.log(out); 
  err && console.log(err); 
  console.log("less action - end");
});
