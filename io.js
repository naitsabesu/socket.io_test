// sockets
module.exports = function(io){
	io.sockets.on('connection', function(socket){
		console.log('Client connected... ');

		socket.on('set_nickname', function(nickname, callback){
			console.log('mensaje recibido: '+ nickname);

			var isAvailable = checkIsAvailable(nickname);
			if(isAvailable)
				socket.nickname = nickname;

			callback(isAvailable);
		});


	  socket.on('message', function(msg){
	    io.sockets.emit('message', socket.nickname, msg);
	  });

	  var checkIsAvailable = function(nickname){
	  	var clients = io.sockets.clients();
	  	for(var client in clients){
	  		if(clients.hasOwnProperty(client)){
	  			if (clients[client].nickname === nickname )
	  				return false;
	  		}
	  	}
	  	return true;
	  };

	});


};