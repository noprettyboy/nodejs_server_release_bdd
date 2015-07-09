var fs = require('fs');
var exec = require('child_process').exec;

//delete old prod.css and prod.js file
console.log('-->delete old prod.css file');
delFile('../asset/css/prod.css');
console.log('-->delete old prod.js file');
delFile('../asset/js/prod.js');

console.log('-->read Build_Combine_And_Compress.cfg');
fs.readFile('Build_Combine_And_Compress.cfg', 'utf-8', function (err, data) {
  if (err) throw err;
  var targetCssFilePath = '../asset/css/prod.css';
  var targetJsFilePath = '../asset/js/prod.js';

  console.log('-->generate fileArr');
  var fileArr = data.split('\r\n');
  
  fileArr.forEach(function(item){
  	if (Trim(item)=='# css file') {
  		console.log('-->begin combine css file');
  		// targetFilePath = '../asset/css/prod.css';
  	} else if(Trim(item)=='# js file'){
  		console.log('-->begin combine js file');
  		// targetFilePath = '../asset/js/prod.js';
  	} else {
  		// console.log('-->current deal file type:' + targetFilePath);
  		console.log('-->get the file path');
  		var filePathArr = item.split('###');
  		var filePath;
  		if (filePathArr[0] === 'css') {
  			filePath = filePathArr[1] + filePathArr[2];
  			console.log('-->read file:' + filePath);
  			var content = fs.readFileSync(filePath, 'utf-8');
  			fs.appendFileSync(targetCssFilePath, content+'\r\n', 'utf8');
  		// 	fs.readSync(filePath, 'utf-8', function(err, data){
		  // 		console.log('-->append file:'+filePath);
		  // 		console.log('-->writing file:'+filePath);
		  // 		fs.appendFileSync(targetCssFilePath, data+'\r\n', 'utf8', function(err){  
				//     if(err)  
				//     {  
				//         console.log(err);  
				//     }
				//     console.log('-->writing file:' +filePath + '---end');
				// });
		  // 	});
  		} else if (filePathArr[0] === 'js') {
  			filePath = filePathArr[1] + filePathArr[2];
  			console.log('-->read file:' + filePath);
  			var content = fs.readFileSync(filePath, 'utf-8');
  			fs.appendFileSync(targetJsFilePath, content+'\r\n', 'utf8');
  		// 	fs.readSync(filePath, 'utf-8', function(err, data){
		  // 		console.log('-->append file:'+filePath);
		  // 		console.log('-->writing file:'+filePath);
		  // 		fs.appendFile(targetJsFilePath, data+'\r\n', 'utf8', function(err){  
				//     if(err)  
				//     {  
				//         console.log(err);  
				//     }
				//     console.log('-->writing file:' +filePath + '---end');
				// });
		  // 	});
  		}
  		// console.log('-->read file:' + filePath);
  	// 	var filePath = '../src/css/'+Trim(item);
	  // 	console.log('-->read file:'+filePath);
	  // 	fs.readFileSync(filePath, 'utf-8', function(err, data){
	  // 		console.log('-->append file:'+filePath);
	  // 		fs.appendFile(targetFilePath, data+'\r\n', 'utf8', function(err){  
			//     if(err)  
			//     {  
			//         console.log(err);  
			//     } 
			// });
	  // 	});
  	}
  });
});

//delete old prod.min.css file
delFile('../asset/css/prod.min.css');
delFile('../asset/js/prod.min.js');

//compress
compressFile("css");
compressFile("js");




function Trim(str)
{ 
	return str.replace(/(^\s*)|(\s*$)/g, ""); 

}

function delFile(filePath){
	if (fs.existsSync(filePath)) {
		fs.unlinkSync(filePath);
	}
}

function compressFile (flag) {
	if ("css"==flag) {
		var child = exec('java -jar jar/yuicompressor-2.4.7.jar ../asset/css/prod.css -o ../asset/css/prod.min.css', function(err,out) { 
		  console.log(out); 
		  err && console.log(err); 
		});
	} else {
		
		var child = exec('uglifyjs ../asset/js/prod.js -o ../asset/js/prod.min.js', function(err,out) { 
		  console.log(out); 
		  err && console.log(err); 
		});
		// var child = exec('java -jar jar/yuicompressor-2.4.7.jar ../asset/js/prod.js -o ../asset/js/prod.min.js', function(err,out) { 
		//   console.log(out); 
		//   err && console.log(err); 
		// });
	}
}