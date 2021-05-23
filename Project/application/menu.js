const prompt = require('prompt-sync')();

const mainMenu = () => {
	console.log("Options\n");
	console.log("0. Exit App");
	console.log("---------------------------");
	console.log("1. View Stories");
	console.log("2. Publish Story");
	console.log("3. Delete Story");
	console.log("---------------------------");
	console.log("4. View Appointment");
	console.log("5. Set Appointment");
	console.log("6. Delete Appointment");
	console.log("---------------------------");
	console.log("7. View deliveries");
	console.log("8. View delivery");
	console.log("9. Set delivery");
	console.log("10. Change delivery");
	console.log("11. Delete delivery");
	console.log("---------------------------");
	console.log("12. View visas");
	console.log("13. View visa");
	console.log("14. Request visa");
	console.log("15. Approve visa");
	console.log("16. Delete visa");
	return prompt("Select Option:");
}

module.exports = {
	mainMenu
}