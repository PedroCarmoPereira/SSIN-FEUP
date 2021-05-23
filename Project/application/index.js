const crypto = require('./encrypt');
const login = require('./login');
const menu = require('./menu');
const fs = require('fs');
const { api, getStories } = require('./api');

const main = async () => {
	login.login.then(async () => {
		login.getToken();
		let option = 0;
		do {
			console.log("\n\tPortal do Ministério de Negócios Estrangeiros PT\t\n");
			option = menu.mainMenu();
			if (option == 1) await getStories();
		} while(option != 0);
	}).catch(error => {
		if (error.error == "Token"){
			fs.unlink('token', (err) => {
				if (err) console.log(err);
			});
		}
		console.log("Failed to log you in.");
	});
}

main();