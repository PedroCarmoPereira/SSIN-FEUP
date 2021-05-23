const crypto = require('./encrypt');
const login = require('./login');
const menu = require('./menu');
const fs = require('fs');
const { 
	api,
	getStories,
	publishStory,
	deleteStory,
	getAppointment,
	setAppointment,
	deleteAppointment,
	getDeliveries,
	getDelivery,
	setDelivery,
	changeDelivery,
	deleteDelivery,
	getVisas,
	requestVisa,
	getVisa,
	approveVisa,
	deleteVisa
} = require('./api');

const main = async () => {
	login.login.then(async () => {
		const token = login.getToken();
		let option = 0;
		do {
			console.log("\n\tPortal do Ministério de Negócios Estrangeiros PT\t\n");
			option = menu.mainMenu();
			if (option == 1) await getStories();
			else if (option == 2) await publishStory(token, "olaola", "adeusadeus");
			else if (option == 3) await deleteStory(token, 8);
			else if (option == 4) await getAppointment(token);
			else if (option == 5) await setAppointment(token, "My appointment motive.", "1995-12-17T03:24:00");
			else if (option == 6) await deleteAppointment(token, 1);
			else if (option == 7) await getDeliveries(token);
			else if (option == 8) await getDelivery(token, 1);
			else if (option == 9) await setDelivery(token, 1, "My delivery content!", "1995-12-17T03:24:00");
			else if (option == 10) await changeDelivery(token, 1, 1, "My delivery content changed!", "1998-03-24T00:00:00");
			else if (option == 11) await deleteDelivery(token, 1);
			else if (option == 12) await getVisas(token);
			else if (option == 13) await getVisa(token, 1);
			else if (option == 14) await requestVisa(token, "My visa motive!", "1995-12-17T03:24:00");
			else if (option == 15) await approveVisa(token, 1);
			else if (option == 16) await deleteVisa(token, 1);
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