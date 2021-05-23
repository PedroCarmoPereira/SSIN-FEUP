const fs = require('fs');
const { api } = require('./api');
const crypto = require('./encrypt');
const prompt = require('prompt-sync')();
   

let token = "";
let flag = true;

fs.readFile('token', function(err, data) {
    if (err){
		flag = false;
		console.log("No account found on device.");
		const username = prompt("Username: ");
		const password = prompt.hide("Password: ");
		console.log(username);
		console.log(password);
		api.post('/api/register', {
            username:username,
            password:password,
        })
            .then(async (response) => {
                if (response.status == 200) {
                    token = response.data.token;
                }
            })
            .catch(function (error) {
                console.log("An error has occurred: " + error.response.data.error);
            });
	}
	else {
		console.log("Logging you in...");
		token = crypto.decrypt(data);
	}
});

if (!flag){
	fs.writeFile('token', crypto.encrypt(token), (err) => {
		if (err) console.log(err);
		console.log("Saved");
	});
}