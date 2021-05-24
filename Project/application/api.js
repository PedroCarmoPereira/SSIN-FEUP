require("dotenv").config();

const axios = require('axios');
const api = axios.create({ baseURL: process.env.SERVER_URL });

// Aux functions
const capitalizeFirstLetter = (str) => {
    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
}

const printBeautifier = (array) => {
    array.forEach(element => {
        Object.entries(element).forEach(([key, value]) => {
            console.log(capitalizeFirstLetter(key) + ": " + value);
        });
    });
}

const getUser = async (token) => {

	return new Promise((resolve, reject) => {
		api.get('/api/user', {
			headers: {
				'Authorization': `${token}`
			}
		})
			.then(async (response) => {
				if (response.status == 200) {
					resolve(response.data.data.id);
				}
			})
			.catch(function (error) {
				console.log(error.response.data);
				reject({ error: "Get User" });
			})
	});
}

// Stories
const getStories = async () => {
	await api.get('/api/stories')
		.then(async (response) => {
			if (response.status == 200)
				printBeautifier(response.data.data);
		}).catch((err) => {
			if (err) console.log("Network Error.");
		});
};

const publishStory = async (token, title, article) => {

	await getUser(token).then(async (id) => {
		await api.post('/api/stories', {
			title,
			article,
			id
		}, {
			headers: {
				'Authorization': `${token}`
			}
		})
			.then(async (response) => {
				if (response.status == 200) {
					console.log('Story Published!\n');
				}
			})
			.catch(function (error) {
				console.log(error.response.data);
			})
	});
}

const deleteStory = async (token, id) => {
	await api.delete('/api/stories/' + id, {
		headers: {
			'Authorization': `${token}`
		}
	})
		.then(async (response) => {
			if (response.status == 200) {
				console.log('Story Deleted!\n');
			}
		})
		.catch(function (error) {
			console.log(error.response.data);
		});
}

// Apointments
const getAppointments = async (token) => {

	await api.get('/api/appointment', {
		headers: {
			'Authorization': `${token}`
		}
	})
		.then(async (response) => {
			if (response.status == 200) {
				printBeautifier(response.data.data);
			}
		})
		.catch(function (error) {
			console.log(error.response.data);
		});
}

const setAppointment = async (token, motive, set_date) => {

	await getUser(token).then(async (requester_id) => {
		await api.post('/api/appointment', {
			requester_id,
			motive,
			set_date
		}, {
			headers: {
				'Authorization': `${token}`
			}
		})
			.then(async (response) => {
				if (response.status == 200) {
					console.log('Appointment scheduled!\n');
				}
			})
			.catch(function (error) {
				console.log(error.response.data);
			})
	});
}

const deleteAppointment = async (token, appointment_id) => {

	await api.delete('/api/appointment/' + appointment_id, {
		headers: {
			'Authorization': `${token}`
		}
	})
		.then(async (response) => {
			if (response.status == 200) {
				console.log('Appointment deleted!');
			}
		})
		.catch(function (error) {
			console.log(error.response.data);
		});
}

// Deliveries
const getDeliveries = async (token) => {

	await api.get('/api/deliveries', {
		headers: {
			'Authorization': `${token}`
		}
	})
		.then(async (response) => {
			if (response.status == 200) {
				printBeautifier(response.data.data);
			}
		})
		.catch(function (error) {
			console.log(error.response.data);
		});
}

const getDelivery = async (token, delivery_id) => {

	await api.get('/api/deliveries/' + delivery_id, {
		headers: {
			'Authorization': `${token}`
		}
	})
		.then(async (response) => {
			if (response.status == 200) {
				printBeautifier(response.data.data);
			}
		})
		.catch(function (error) {
			console.log(error.response.data);
		});
}

const setDelivery = async (token, employee_id, content, op_date) => {

	await api.post('/api/deliveries', {
		employee_id,
		content,
		op_date
	}, {
		headers: {
			'Authorization': `${token}`
		}
	})
		.then(async (response) => {
			if (response.status == 200) {
				console.log('Delivery scheduled!');
			}
		})
		.catch(function (error) {
			console.log(error.response.data);
		});
}

const changeDelivery = async (token, delivery_id, employee_id, content, op_date) => {

	await api.put('/api/deliveries/' + delivery_id, {
		employee_id,
		content,
		op_date
	}, {
		headers: {
			'Authorization': `${token}`
		}
	})
		.then(async (response) => {
			if (response.status == 200) {
				console.log('Delivery changed!');
			}
		})
		.catch(function (error) {
			console.log(error.response.data);
		});
}

const deleteDelivery = async (token, delivery_id) => {

	await api.delete('/api/deliveries/' + delivery_id, {
		headers: {
			'Authorization': `${token}`
		}
	})
		.then(async (response) => {
			if (response.status == 200) {
				console.log('Delivery deleted!');
			}
		})
		.catch(function (error) {
			console.log(error.response.data);
		});
}

// Visas
const getVisas = async (token) => {

	await api.get('/api/visas', {
		headers: {
			'Authorization': `${token}`
		}
	})
		.then(async (response) => {
			if (response.status == 200) {
				printBeautifier(response.data.data);
			}
		})
		.catch(function (error) {
			console.log(error.response.data);
		});
}

const getVisa = async (token, visa_id) => {

	return new Promise((resolve, reject) => {
		api.get('/api/visas/' + visa_id, {
			headers: {
				'Authorization': `${token}`
			}
		})
			.then(async (response) => {
				if (response.status == 200) {
					resolve(response.data.data);
				}
			})
			.catch(function (error) {
				console.log(error.response.data);
				reject({ error: "Get Visa" });
			})
	});
}
const requestVisa = async (token, motive, applied) => {

	await getUser(token).then(async (requester_id) => {
		await api.post('/api/visas', {
			motive,
			applied,
			requester_id
		}, {
			headers: {
				'Authorization': `${token}`
			}
		})
			.then(async (response) => {
				if (response.status == 200) {
					console.log('Visa requested!');
				}
			})
			.catch(function (error) {
				console.log(error.response.data);
			})
	});
}

const approveVisa = async (token, visa_id) => {

	await getVisa(token, visa_id).then(async (visa) => {
		const motive = visa.motive;
		const applied = visa.applied;
		const requester_id = visa.requester_id;
		const accepted = 1;

		await api.put('/api/visas/' + visa_id, {
			motive,
			applied,
			requester_id,
			accepted
		}, {
			headers: {
				'Authorization': `${token}`
			}
		})
			.then(async (response) => {
				if (response.status == 200) {
					console.log('Visa Approved!');
				}
			})
			.catch(function (error) {
				console.log(error.response.data);
			})
	})
		.catch(function (error) {
			console.log(error);
		});
}

const deleteVisa = async (token, visa_id) => {

	await api.delete('/api/visas/' + visa_id, {
		headers: {
			'Authorization': `${token}`
		}
	})
		.then(async (response) => {
			if (response.status == 200) {
				console.log('Visa deleted!');
			}
		})
		.catch(function (error) {
			console.log(error.response.data);
		});
}


module.exports = {
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
	getVisa,
	requestVisa,
	approveVisa,
	deleteVisa
}