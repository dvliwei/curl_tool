if(process.env.NODE_ENV==undefined) process.env.NODE_ENV='development';


if(String.prototype.md5==undefined){
	String.prototype.md5 = function(){
		var hash = require('crypto').createHash('md5');
		return hash.update(this+"").digest('hex');
	};
}
if(String.prototype.isNumeric==undefined){
  String.prototype.isNumeric = function(){
    return (this - 0) == this && (this+'').replace(/^\s+|\s+$/g, "").length > 0;
  };
}
if(String.prototype.startsWith==undefined){
  String.prototype.startsWith = function(str){
    return this.indexOf(str) == 0;
  };
}
if ( !String.prototype.contains ) {
  String.prototype.contains = function() {
      return String.prototype.indexOf.apply( this, arguments ) !== -1;
  };
}
if(Buffer.prototype.match==undefined){
  Buffer.prototype.match = function(regexp){
    return this.toString().match(regexp);
  };
}
if(Date.prototype.format==undefined){
  process.env.TZ = 'Asia/Shanghai';
	Date.prototype.format = function(format){
		if(format==undefined) format = "Y-m-d H:i:s";
		var year = this.getFullYear();
		var month = this.getMonth()+1;
		var day = this.getDate();
		var hour = this.getHours();
		var minute = this.getMinutes();
		var second = this.getSeconds();
		var result = format.replace('Y', year);
		result = result.replace('m', (month<10?"0"+month:month));
		result = result.replace('d', (day<10?"0"+day:day));
		result = result.replace('H', (hour<10?"0"+hour:hour));
		result = result.replace('i', (minute<10?"0"+minute:minute));
		result = result.replace('s', (second<10?"0"+second:second));
		return result;
	};
  Date.prototype.yesterday = function(){ // 返回这一天的前一天
    var result = new Date(this);
    result.setDate(result.getDate()-1);
    return result;
  };
  Date.prototype.tomorrow = function(){ // 返回这一天的后一天
    var result = new Date(this);
    result.setDate(result.getDate()+1);
    return result;
  };
}
if(String.prototype.capitalize==undefined){
  String.prototype.capitalize = function () {
    return this[0].toUpperCase() + this.slice(1);
  };
}
if(String.prototype.trim==undefined){
  String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
  };
}
if(String.prototype.replaceAll==undefined){
  String.prototype.replaceAll = function(search, replacement) {
    return this.split(search).join(replacement);
  };
}
if(console.debug==undefined){
	if(process.env.NODE_ENV==='development'){
		console.debug = function(){
			var now = new Date();
			var millisecond = now.getTime()%1000;
			var millisecond_s = millisecond;
			if(millisecond<10) millisecond_s = '00'+millisecond;
			else if(millisecond<100) millisecond_s = '0'+millisecond;
      arguments[0] = "\033[36mdebug: \033[90m["+now.format()+'.'+millisecond_s+"]\033[39m " + arguments[0];
      console.log.apply(null, arguments);
		};
	}else console.debug = function(){};
	
	var console_error = console.error;
	console.error = function(){
    var now = new Date();
    var millisecond = now.getTime()%1000;
    var millisecond_s = millisecond;
    if(millisecond<10) millisecond_s = '00'+millisecond;
    else if(millisecond<100) millisecond_s = '0'+millisecond;
    arguments[0] = "\033[31merror: \033[90m["+now.format()+'.'+millisecond_s+"]\033[39m " + arguments[0];
	  console_error.apply(null, arguments);
	  if(arguments[0] && arguments[0].stack) console_error(JSON.stringify(arguments[0].stack));
    if(arguments[1] && arguments[1].stack) console_error(JSON.stringify(arguments[1].stack));
	};
}

if (![].contains) {
  Object.defineProperty(Array.prototype, 'contains', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(searchElement/*, fromIndex*/) {
      if (this === undefined || this === null) {
        throw new TypeError('Cannot convert this value to object');
      }
      var O = Object(this);
      var len = parseInt(O.length) || 0;
      if (len === 0) { return false; }
      var n = parseInt(arguments[1]) || 0;
      if (n >= len) { return false; }
      var k;
      if (n >= 0) {
        k = n;
      } else {
        k = len + n;
        if (k < 0) k = 0;
      }
      while (k < len) {
        var currentElement = O[k];
        if (searchElement === currentElement ||
          searchElement !== searchElement && currentElement !== currentElement
        ) {
          return true;
        }
        k++;
      }
      return false;
    }
  });
}


var fs = require('fs');
if(fs.mkdirs==undefined){
  fs.mkdirs = function(path, mode, callback){
    if (typeof mode === 'function'){
      callback = mode;
      mode = 0777;
    }
    var dirs = path.split("/");
    var confirmed_dirs = [dirs.shift()]; 
    var walk = function(){
      if(dirs.length==0) callback();
      else{
        confirmed_dirs.push(dirs.shift());
        var folder_path = confirmed_dirs.join('/');
        fs.stat(folder_path, function(err, stat){
          if(err){
            fs.mkdir(folder_path, function(){
              walk();
            });
          }else{
            walk();
          }
        });
      }
    };
    walk();
  };
}
