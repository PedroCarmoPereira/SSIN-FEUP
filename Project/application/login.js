const fs = require('fs');
const { api } = require('./api');
const crypto = require('./encrypt');
const prompt = require('prompt-sync')();

let token;
let flag = true;
const login = new Promise ((resolve, reject) => {
	fs.readFile('token', async function(err, data) {
		if (err){
			flag = false;
			console.log("No account found on device.");
			const username = prompt("Username: ");
			const password = prompt.hide("Password: ");
			await api.post('/api/register', {
				username:username,
				password:password,
			})
				.then(async (response) => {
					if (response.status == 200) {
						token = response.data.token;
						resolve(token);
					}
				})
				.catch(function (error) {
					console.log("An error has occurred: " + error.response.data.error);
					reject({error: "Server"});
				});
		}
		else {
			token = crypto.decrypt(JSON.parse(data));
			//Falta ver se o token é válido
			console.log("Logging you in...");
			api.get('/api/token',{
				headers:{
				  'Authorization': `${token}`
				}
			  }).then(async (response) => {
				if (response.status == 200) resolve(token)
			  }).catch(function (error){
				reject({error: "Token"});
			  });
		}

		if (!flag){
			fs.writeFile('token', JSON.stringify(crypto.encrypt(token)), (err) => {
				if (err) console.log(err);
				console.log("Saved account info.");
			});
		}
	});
});

const getToken = () => {
	return token;
}

module.exports = {
	login,
	getToken,
}