var app = require( 'express' )(  );
var http = require('http').Server( app );
var io = require( 'socket.io' )( http );


http.listen(3000, ( ) => {
	console.log("https open");
});

// URL 포워딩
app.get('/', ( req, res ) => {
	res.sendfile( 'rtcClient.html' );
});

// Socket io 
io.on( 'connection', ( socket ) => {

	console.log( 'Connection User');

	// 이벤트 전달
	socket.emit( 'new', 'hellow' );

	// 이벤트 받기
	socket.on('sdp', ( data ) => {
		console.log( 'sdp');	
		socket.broadcast.emit( 'sdp', data );
	});

	socket.on('candidate', ( data ) => {  
		console.log( 'candidate');	
		socket.broadcast.emit( 'candidate', data );
	});
});