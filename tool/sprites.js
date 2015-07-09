#!/usr/bin/env node
var child_process = require("child_process"),
fs = require("fs");
var spritesCMD = "java -Xms64m -Xmx256m -Djava.ext.dirs=tool/smartsprites/lib org.carrot2.labs.smartsprites.SmartSprites src/css/prod.css";
console.log("CSS sprites generate start");
child_process.exec(spritesCMD, function (err, stdout, stderr) {
	if (err || stderr) return console.log(err, stderr);
	//rename sprites.css
	fs.rename("src/css/prod-sprite.css", "src/css/prod.css", function(err) {
		if (err) return console.log(err);
		console.log(stdout);
		console.log("CSS sprites generate complete");
		//delete the old prod-sprite.css
		//fs.unlink("src/css/prod-sprite.css");
	});
});