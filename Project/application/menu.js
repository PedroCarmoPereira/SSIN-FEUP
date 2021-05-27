const prompt = require('prompt-sync')();

const mainMenu = (access_lvl) => {
	console.log("Options\n");
	console.log("0. Exit App and enter Real-time Chat");
	console.log("---------------------------");
	console.log("1. View Stories");
	if (access_lvl >= 1) {
		console.log("2. Publish Story");
		console.log("3. Delete Story");
	}
	console.log("---------------------------");
	if (access_lvl >= 1)
		console.log("4. View all Appointments");
	else
		console.log("4. View my Appointments");
	console.log("5. Set Appointment");
	console.log("6. Delete Appointment");
	if (access_lvl >= 1) {
		console.log("---------------------------");
		console.log("7. View all Deliveries");
		console.log("8. View Delivery");
		if (access_lvl == 3) {
			console.log("9. Set Delivery");
			console.log("10. Change Delivery");
			console.log("11. Delete Delivery");
		}
	}
	console.log("---------------------------");
	if (access_lvl >= 1) {
		console.log("12. View all Visas");
		console.log("13. View Visa");
	}
	console.log("14. Request Visa");
	if (access_lvl >= 2) {
		console.log("15. Approve Visa");
	}
	console.log("16. Delete Visa");
	if (access_lvl >= 1) {
		console.log("---------------------------");
		console.log("17. Send Message");
	}
	return prompt("\nSelect Option: ");
}

const chatMenu = (user_list) => {
	console.log("Choose a user\n");
	user_list.forEach(user => {
		console.log(user.id + ". " + user.name);
	});
	console.log("-1. Exit and see stored messages.");
	console.log("\n");
	return prompt("Select User: ");
}

module.exports = {
	mainMenu, chatMenu
}