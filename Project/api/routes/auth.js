const db = require("../db/database.js");
const bcrypt = require("bcryptjs");

//To test:
//curl -X POST -H "Content-Type: application/json" -d '{"username":"Zegran123", "password":"Zegran1234567"}' http://localhost:8010/api/register
module.exports = (app) => {
	app.post('/api/register', (req, res) => {
		if (req.body.username === undefined || req.body.password === undefined) {
			res.status(403).send({
				message: 'Must set username and password fields',
			});
		}
		else {
			const username = req.body.username;
			const password = req.body.password;
			let check = 'SELECT * FROM user WHERE username = ?';
			db.get(check, [username], (err, row) => {
				if (err) {
					res.status(400).json({ "error": err.message });
					return;
				}
				if (!row) {
					res.status(404).json({ "error": "Invalid Credentials" });
					return;
				}
				let test = bcrypt.compareSync(password, row.password);
				const user_id = row.id;
				if (test) {
					let checkForRegister = 'SELECT token FROM user WHERE id = ?';
					db.get(checkForRegister, user_id, (err, row) => {
						if (err) {
							res.status(400).json({ "error": err.message });
							return;
						}

						if (row.token != null) {
							res.status(403).json({ "error": "Account already registered" });
							return;
						}
						const token = bcrypt.hashSync(username, 10);
						let insert0 = 'UPDATE user SET token = ? WHERE username = ?';
						let stmt0 = db.prepare(insert0);
						stmt0.run(token, username);

						let insert1 = 'INSERT INTO ip_client (uid, addr, clientport, serverport) VALUES (?, ?, ?, ?)';
						let stmt1 = db.prepare(insert1);
						stmt1.run(user_id, req.connection.remoteAddress, req.header('cp'), req.header('sp'));
						res.status(200).send({
							message: 'Successfully Registered',
							token: token
						});
					});
				}
				else {
					res.status(404).json({ "error": "Invalid Credentials" });
					return;
				}
			});
		}
	});
};