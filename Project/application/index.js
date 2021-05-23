const crypto = require('./encrypt');
const login = require('./login');
const fs = require('fs');

const main = async () => {
	//console.log(process.env.SERVER_URL);
	login.login.then(() => {
		console.log(login.getToken());
	});
	
	/*
	const plain = Buffer.from('Hello world');

	const encrypted = crypto.encrypt(plain);
	console.log('Encrypted:', encrypted.toString());

	console.log("Enc: ", encrypted);

	const decrypted = crypto.decrypt(encrypted);
	console.log('Decrypted:', decrypted.toString());
	
	fs.readFile('token', function(err, data) {

	});*/
}

main();