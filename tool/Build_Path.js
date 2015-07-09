var fs=require('fs');

console.log("->read the configure file");
buffers = fs.readFileSync('Path_Build.cfg');
str = buffers.toString();
console.log("->translate str to json and deal it");
strJson = JSON.parse(str);

var dataObj = {};

for(var flag in strJson){
	console.log("->into flag:"+flag);
	dataObj.curFlag = flag;
	dataObj.curData = strJson[flag];

	dataObj.curData.forEach(function(item){
		for(var key in item){
			if ("path"==key) {
				dataObj.curPath = item[key];
				continue;
			}else{
				dataObj.Reg = eval('/"[._-\\w\\/]*'+key+'\\//g');
				dataObj.RegS = eval("/'[._-\\w\\/]*"+key+"\\//g"); 
				dataObj.Html = '"'+item[key];
				dataObj.HtmlS = "'"+item[key];

				console.log("write " + key + " path");
				updatePath(dataObj.curPath, dataObj.Reg, dataObj.Html);
				updatePath(dataObj.curPath, dataObj.RegS, dataObj.HtmlS);
			} 
		}
	});	
}


function updatePath(filePath, reg, html){
	var contents = fs.readFileSync(filePath).toString();
	fs.writeFileSync(filePath, contents.replace(reg, html));
	
	// fs.readFile(filePath, function(err, chrunk) {
	// 	var contents = chrunk.toString();
	// 	fs.writeFile(filePath, contents.replace(reg, html), function(err) {
	// 		err && console.log("update error:->", err);
	// 	});
	// });
}