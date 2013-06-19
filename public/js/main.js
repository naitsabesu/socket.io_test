$(function(){
	var socket = io.connect('/');
	var $login = $('#login');
	var $chat = $('#chat');
	var $messages = $('#messages');
	var $message = $('#message');


	socket.on('connect',function(){
		console.log('client connected with socket');	

		init();
	});



	var init = function(){

		$('#nickname').on('keyup', function(e){
			// console.log('keyup!!');
			var code = e.which || e.keyCode;
			if(code == 13){
				setNickName($(this).val());
			}
		});
		$login.show();
		$chat.hide();
	};

	var setNickName = function(nickname){
		console.log('enviando nickname: '+nickname);
		
		socket.emit('set_nickname', nickname, function(is_available){
			if(is_available){
				setUpChat(nickname);
			}else{
				console.log('Nickname not available');
			}
		});
	};

	var setUpChat = function(nickname){
		$login.hide();
		$chat.show();

		$('#submit').on('click', function(){
			sendMessage($message.val());
			$message.val('').focus();
		});
		socket.on('message', function(nickname, msg){
			appendMessage(nickname, msg);
		});

	};

	var sendMessage = function(msg){
		socket.emit('message', msg);
	};

	var appendMessage = function(nickname, msg){
		$messages.append('<li>@'+nickname+': '+msg+'</li>');
	};

});