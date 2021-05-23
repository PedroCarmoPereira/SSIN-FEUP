const prompt = require('prompt-sync')();

const mainMenu = () => {
	console.log("Options\n");
	console.log("0. Exit App");
	console.log("1. View Stories\n");
	return prompt("Select Option:");
}

module.exports = {
	mainMenu
}