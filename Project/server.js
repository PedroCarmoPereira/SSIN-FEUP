const http = require('http');

const server = http.createServer((req, res) => {
	if (req.url === '/'){
		res.write("A route and a page");
		res.end();
	}
	else if (req.url === '/hello'){
		res.write("<h1>Hello, World!</h1>");
		res.end();
	}
});

server.listen(4500);
console.log('Listening on 4500');