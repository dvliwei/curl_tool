require('./additions.js');
var express = require('express');

var app = express();
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({extended: false}));
require('./routes.js')(app);

var port = 9091;
var arguments = process.argv.splice(2);
if(arguments.length > 0) port = arguments[0];
app.listen(port);


process.on('uncaughtException', function(err) {
  console.log(new Date().format('Y-m-d H:i:s') + ' [%d] %s', port, 'Caught exception: ' + err);
  console.log(err.stack);
});
