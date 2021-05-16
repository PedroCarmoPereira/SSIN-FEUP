const db = require("../db/database.js");
const bcrypt = require("bcryptjs");

module.exports = (app) => {
	app.get('/register', (req, res) => {
        if (req.query.username === undefined || req.query.password === undefined){
            res.status(403).send({
                message:'Must set username and password fields',
            });
        }
        else {
			const username = req.query.username;
			const password = req.query.password;
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
				if (test){
					let checkForRegister = 'SELECT * FROM token WHERE user_id = ?';
					db.get(checkForRegister, user_id, (err, row) => {
						if (err) {
							res.status(400).json({ "error": err.message });
							return;
						}

						if(row) {
							res.status(403).json({ "error": "Account already registered"});
							return;
						}
						const token = bcrypt.hashSync(username, 10);
						let insert = 'INSERT INTO token (token, user_id) VALUES (?, ?)';
						let stmt = db.prepare(insert);
						stmt.run(token, user_id);
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