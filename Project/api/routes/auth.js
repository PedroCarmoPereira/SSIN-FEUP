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
				if (test){
					res.status(200).send({
						message: 'Auth',
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