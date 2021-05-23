const crypto = require('./encrypt');

const main = () => {
	//console.log(process.env.SERVER_URL);
	require('./login');
	/*
	const plain = Buffer.from('Hello world');

	const encrypted = crypto.encrypt(plain);
	console.log('Encrypted:', encrypted.toString());

	const decrypted = crypto.decrypt(encrypted);
	console.log('Decrypted:', decrypted.toString());
	*/
}

main();