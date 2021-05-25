const crypto = require('./encrypt');
const { login, getToken } = require('./login');
const menu = require('./menu');
const fs = require('fs');
const {
	api,
	getStories,
	getUsers,
	getOwnUser,
	getMessages,
	createMessage,
	getUserIP,
	getCommKey,
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
const prompt = require('prompt-sync')();
const Peer = require("./Peer");

const capitalizeFirstLetter = (str) => {
	// converting first letter to uppercase
	const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
	return capitalized;
}

const printBeautifier = (obj) => {
	Object.entries(obj).forEach(([key, value]) => {
		console.log(capitalizeFirstLetter(key) + ": " + value);
	});
}

if (!process.env.PORT || !process.env.SERVER_PORT)
	throw Error("Env variables for PORT and SERVER_PORT not found");

const peer = new Peer(process.env.PORT);

const main = async () => {
	return new Promise((resolve, reject) => {
		login().then(async () => {
			let option = 0;
			let token = getToken();
			await getOwnUser(token).then(async (own_user) => {
				console.log("\nWelcome, " + own_user.name + ".\n");
				peer.setToken(token);
				do {
					console.log("\n\tPortal do Ministério de Negócios Estrangeiros PT\t\n");
					option = menu.mainMenu(own_user.access_lvl);
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
					else if (option == 17) {
						await getUsers(token).then(async (user_list) => {
							let user_id = menu.chatMenu(user_list);
							if (user_list.some(user => user.id == user_id)) {
								let user_name = user_list.find(user => user.id == user_id).name;
								console.log("\nChat with " + user_name + "\n");
								await getMessages(token, own_user.id, user_id).then(async (messages) => {
									messages.forEach(msg => {
										if (msg.sender_id == own_user.id)
											console.log("You: " + msg.content);
										else
											console.log(user_name + ": " + msg.content);
									});
									// POST request
									let new_msg = prompt("You: ");
									await createMessage(token, own_user.id, user_id, new_msg, new Date().getTime());
								});
							}
							else {
								console.log("Invalid User!");
							}
						});
					}
					if (option != 0) prompt("\nPress ENTER to continue...");
				} while (option != 0);
				resolve(token);
			});
		}).catch(error => {
			if (error.error == "Token") {
				fs.unlink('token', (err) => {
					if (err) console.log(err);
				});
			}
			console.log(error);
		});
	});
}

const privateChat = async (token) => {
	return new Promise(async (resolve, reject) => {
		if (!token) reject(undefined);
		await getOwnUser(token).then(async (own_user) => {
			if (own_user.access_lvl < 1) resolve(token);
			await getUsers(token).then(async (user_list) => {
				console.log("\n\tReal-time Chat\t\n");
				let user_id = menu.chatMenu(user_list);
				if (user_list.some(user => user.id == user_id)) {
					let user_name = user_list.find(user => user.id == user_id).name;
					console.log("\nChat with " + user_name + "\n");
					peer.setPartner(user_id);
					await getMessages(token, own_user.id, user_id).then(async (messages) => {
						messages.forEach(msg => {
							if (msg.sender_id == own_user.id)
								console.log("You: " + msg.content);
							else
								console.log("Them: " + msg.content);
						});
						await getCommKey(own_user.id, user_id, token).then(async (key) => {
							if (key !== undefined) {
								peer.setKey(key);
							}
						})
						await getUserIP(token, user_id).then(async (userIP) => {
							if (userIP) {
								try {
									process.stdout.write("You: ");
									peer.connectTo(userIP.addr + ":" + userIP.clientPort);
									process.stdin.on('data', data => {
										const message = data.toString().replace(/\n/g, "");
										const cipher = crypto.encryptECB(message, peer.key);
										peer.write(cipher);
										process.stdout.write("You: ");
									});
								} catch (error) {
									console.log(error);
								}
							}
							else {
								console.log("User is not online");
							}
						});
					});
				}
				else {
					console.log("Invalid User!");
					resolve(token);
				}
			})
				.catch(error => console.log(error));
		})
	});
}

const viewMessages = async (token) => {
	await getOwnUser(token).then(async own_user => {
		const id = prompt('Enter the user id whose messages you would like to read: ');
		await getCommKey(own_user.id, id, token).then(async (key) => {
			if (key !== undefined) {
				try {
					const data = fs.readFileSync('./messages/' + id + '.txt', 'UTF-8');

					// split the contents by new line
					const lines = data.split(/\r?\n/);

					// print all lines
					lines.forEach((line) => {
						if (line !== "\n" && line != "" && line != "\r" && line) {
							const data = JSON.parse(line);
							const text = crypto.decryptECB(data.payload.message, key);
							console.log("User ID" + data.user + " sent: " + text);
						}
					});
				}
				catch {
					console.log("Unable to open file: Users haven't exchanged messages");
				}
			}
		}).catch(err => console.log(err));
	});
};

main().then(async (token) => {
	await privateChat(token).then(async (token) => {
		viewMessages(token)
	});
});
