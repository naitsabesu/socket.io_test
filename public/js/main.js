$(function(){
	var socket = io.connect('/');
	var $chat = $('#chat');

	socket.on('connect',function(){
		console.log('client connected with socket');
		$chat.hide();

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
	};

	var setNickName = function(nickname){
		console.log('enviando nickname: '+nickname);
		
		socket.emit('set_nickname', nickname);

		if(is_available){
			setUpChat();
		}

	};

	var setUpChat = function(){

	}


});