
/**
 * Module dependencies.
 */

var express = require('express')
  ,	app = express()
  , routes = require('./routes')
  , user = require('./routes/user')
  , server = require('http').createServer(app)
  , path = require('path');  

var io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


// sockets
io.sockets.on('connection', function(socket){
	console.log('Client connected... ');

	socket.on('set_nickname', function(n){
		console.log('mensaje recibido: '+ n);
	});
});

