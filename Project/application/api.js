require("dotenv").config();

const axios = require('axios');
const api = axios.create({baseURL: process.env.SERVER_URL});

// Aux functions
const getUser = async (token) => {
	
	await api.get('/api/user', {
		headers:{
			'Authorization': `${token}`
		}
	})
	.then(async (response) => {
		if (response.status == 200) {
			return response.data.data.id;
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}

// Stories
const getStories = async () => {
	await api.get('/api/stories')
		.then(async (response) => {
			if (response.status == 200) console.log(response.data.data);
		}).catch((err) => {
			if (err) console.log("Network Error.");
		});
};

const publishStory = async (token, title, article) => {

	const id = getUser(token);

	await api.post('/api/stories', {
		title,
		article,
		id
	}, {
		headers:{
			'Authorization': `${token}`
		}
	})
	.then(async (response) => {
		if (response.status == 200) {
			console.log('Success!\n');
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}

const deleteStory = async (token, id) => {
	await api.delete('/api/stories/' + id, {
		headers:{
			'Authorization': `${token}`
		}
	})
	.then(async (response) => {
		if (response.status == 200) {
			console.log('Story Deleted!\n');
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}

// Apointments
const getAppointment = async (token) => {

	await api.get('/api/appointment', {
		headers:{
			'Authorization': `${token}`
		}
	})
	.then(async (response) => {
		if (response.status == 200) {
			console.log(response.data.data);
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}

const setAppointment = async (token, motive, set_date) => {

	const requester_id = getUser(token);

	await api.post('/api/appointment', {
		requester_id,
		motive,
		set_date
	}, {
		headers:{
			'Authorization': `${token}`
		}
	})
	.then(async (response) => {
		if (response.status == 200) {
			console.log('Appointment scheduled!\n');
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}

const deleteAppointment = async (token, appointment_id) => {

	await api.delete('/api/appointment/' + appointment_id, {
		headers:{
			'Authorization': `${token}`
		}
	})
	.then(async (response) => {
		if (response.status == 200) {
			console.log('Appointment deleted!');
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}

// Deliveries
const getDeliveries = async (token) => {

	await api.get('/api/deliveries', {
		headers:{
			'Authorization': `${token}`
		}
	})
	.then(async (response) => {
		if (response.status == 200) {
			console.log(response.data.data);
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}

const getDelivery = async (token, delivery_id) => {

	await api.get('/api/deliveries/' + delivery_id, {
		headers:{
			'Authorization': `${token}`
		}
	})
	.then(async (response) => {
		if (response.status == 200) {
			console.log(response.data.data);
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}

const setDelivery = async (token, employee_id, content, op_date) => {

	await api.post('/api/deliveries', {
		employee_id,
		content,
		op_date
	}, {
		headers:{
			'Authorization': `${token}`
		}
	})
	.then(async (response) => {
		if (response.status == 200) {
			console.log('Delivery scheduled!');
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}

const changeDelivery = async (token, delivery_id, employee_id, content, op_date) => {

	await api.put('/api/deliveries/' + delivery_id, {
		employee_id,
		content,
		op_date
	}, {
		headers:{
			'Authorization': `${token}`
		}
	})
	.then(async (response) => {
		if (response.status == 200) {
			console.log('Delivery changed!');
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}

const deleteDelivery = async (token, delivery_id) => {

	await api.delete('/api/deliveries/' + delivery_id, {
		headers:{
			'Authorization': `${token}`
		}
	})
	.then(async (response) => {
		if (response.status == 200) {
			console.log('Delivery deleted!');
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}

// Visas
const getVisas = async (token) => {

	await api.get('/api/visas', {
		headers:{
			'Authorization': `${token}`
		}
	})
	.then(async (response) => {
		if (response.status == 200) {
			console.log(response.data.data);
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}

const getVisa = async (token, visa_id) => {

	await api.get('/api/visas/' + visa_id, {
		headers:{
			'Authorization': `${token}`
		}
	})
	.then(async (response) => {
		if (response.status == 200) {
			console.log(response.data.data);
			return response.data.data;
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}
const requestVisa = async (token, motive, applied) => {

	const requester_id = getUser(token);

	await api.post('/api/visas', {
		motive,
		applied,
		requester_id
	}, {
		headers:{
			'Authorization': `${token}`
		}
	})
	.then(async (response) => {
		if (response.status == 200) {
			console.log('Visa requested!');
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}

const approveVisa = async (token, visa_id) => {

	const visa = getVisa(token, visa_id);
	console.log(visa);
	const motive = visa.motive;
	const applied = visa.applied;
	const requester_id = getUser(token);
	console.log('olaaa: ');
	console.log(requester_id);
	const accepted = 1;

	await api.put('/api/visas/' + visa_id, {
		motive,
		applied,
		requester_id,
		accepted
	}, {
		headers:{
			'Authorization': `${token}`
		}
	})
	.then(async (response) => {
		if (response.status == 200) {
			console.log('Visa Approved!');
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}

const deleteVisa = async (token, visa_id) => {

	await api.delete('/api/visas/' + visa_id, {
		headers:{
			'Authorization': `${token}`
		}
	})
	.then(async (response) => {
		if (response.status == 200) {
			console.log('Visa deleted!');
		}
	})
	.catch(function (error) {
		console.log(error);
	});
}


module.exports = { 
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
	getVisa,
	requestVisa,
	approveVisa,
	deleteVisa
}