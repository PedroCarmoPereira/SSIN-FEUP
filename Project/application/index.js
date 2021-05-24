const crypto = require('./encrypt');
const login = require('./login');
const menu = require('./menu');
const fs = require('fs');
const prompt = require('prompt-sync')();
const {
	api,
	getStories,
	publishStory,
	deleteStory,
	getAppointments,
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

const capitalizeFirstLetter = (str) => {
    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
}

const printBeautifier = (array) => {
    Object.entries(array).forEach(([key, value]) => {
		console.log(capitalizeFirstLetter(key) + ": " + value);
	});
}

const getUserAccessLvl = async (token) => {
	return new Promise((resolve, reject) => {
		api.get('/api/user', {
			headers: {
				'Authorization': `${token}`
			}
		})
			.then(async (response) => {
				if (response.status == 200) {
					resolve(response.data.data.access_lvl);
				}
			})
			.catch(function (error) {
				console.log(error.response.data);
				reject({ error: "Get User" });
			})
	});
}

const main = async () => {
	login.login.then(async () => {
		const token = login.getToken();
		let option = 0;
		do {
			console.log("\n\tPortal do Ministério de Negócios Estrangeiros PT\t\n");
			const user_access_lvl = await getUserAccessLvl(token);
			option = menu.mainMenu(user_access_lvl); 
			console.log("\n");
			if (option == 1) await getStories();
			else if (option == 2) {
				const title = prompt("\nStory Title: ");
				const article = prompt("Story Article: ");
				await publishStory(token, title, article);
			}
			else if (option == 3) {
				const id = prompt("\nStory ID: ");
				await deleteStory(token, id);
			}
			else if (option == 4) {
				await getAppointments(token);
			}
			else if (option == 5) {
				const motive = prompt("\nAppointment Motive: ");
				const set_date = prompt("Appointment Date: ");
				await setAppointment(token, motive, set_date);
			}
			else if (option == 6) {
				const id = prompt("\nAppointment ID: ");
				await deleteAppointment(token, id);
			}
			else if (option == 7) {
				await getDeliveries(token);
			}
			else if (option == 8) {
				const id = prompt("\nDelivery ID: ");
				await getDelivery(token, id);
			}
			else if (option == 9) {
				const employee_id = prompt("\nDelivery Employee ID: ");
				const content = prompt("Delivery Content: ");
				const op_date = prompt("Delivery Date: ");
				await setDelivery(token, employee_id, content, op_date);
			}
			else if (option == 10) {
				const delivery_id = prompt("\nDelivery ID: ");
				const employee_id = prompt("New Delivery Employee ID: ");
				const content = prompt("New Delivery Content: ");
				const op_date = prompt("New Delivery Date: ");
				await changeDelivery(token, delivery_id, employee_id, content, op_date);
			}
			else if (option == 11) {
				const delivery_id = prompt("\nDelivery ID: ");
				await deleteDelivery(token, delivery_id);
			}
			else if (option == 12) {
				await getVisas(token);
			}
			else if (option == 13) {
				const visa_id = prompt("\nVisa ID: ");
				await getVisa(token, visa_id)
					.then(visa => printBeautifier(visa))
					.catch(function (error) {
						console.log(error);
					});
			}
			else if (option == 14) {
				const motive = prompt("\nVisa Motive: ");
				const set_date = prompt("Visa Date: ");
				await requestVisa(token, motive, set_date);
			}
			else if (option == 15) {
				const visa_id = prompt("\nVisa ID: ");
				await approveVisa(token, visa_id);
			}
			else if (option == 16) {
				const visa_id = prompt("\nVisa ID: ");
				await deleteVisa(token, visa_id);
			}
			if (option != 0) prompt("\nPress ENTER to continue...");
		} while (option != 0);
	}).catch(error => {
		if (error.error == "Token") {
			fs.unlink('token', (err) => {
				if (err) console.log(err);
			});
		}
		console.log("Failed to log you in.");
	});
}

main();