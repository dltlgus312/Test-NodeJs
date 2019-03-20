var app = require( 'express' )(  );
var http = require( 'http' ).Server( app );
var io = require( 'socket.io' )( http );

// URL 포워딩
app.get('/', ( req, res ) => {
	res.sendfile( 'client.html' );
});

// 서버 오픈
http.listen( 3000, (  ) => {
	console.log( 'listening on :3000' );
});

// Socket io 연결시
io.on( 'connection', ( socket ) => {

	console.log( 'a user connected' );

	// 이벤트 전달
	socket.emit( 'new connection', 'hellow world' );

	// 이벤트 받기
	socket.on('user chat', ( msg ) => {  
		console.log( msg );	
		io.emit( 'user chat', msg );
	});
});