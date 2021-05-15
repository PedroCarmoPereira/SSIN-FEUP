const db = require("../db/database.js");
//const bcrypt = require("bcryptjs");
//const SALT_LEN = 10;

module.exports = (app) => {
	app.get('/register', (req, res) => {
        if (req.query.username === undefined || req.query.password === undefined){
            res.status(403).send({
                message:'Must set username and password fields',
            });
        }
        else {
			
			const username = req.query.username;
			let salt;
			let saltQ = 'SELECT * FROM user WHERE username = ?';
			db.get(saltQ, [username], (err, rows) => {
				console.log(rows);
				//salt = rows.salt;
			});
			/*let stmt = db.prepare('SELECT salt FROM user WHERE username = \'AdminAcc\'');
			let salt = db.run('SELECT salt FROM user WHERE user.username = \'AdminAcc\'');
			/*db.all(saltQ, [], (err, row) => {
				if (err) throw err;
				salt += row[0].salt;
			});*/
			/*
			let check = 'SELECT username FROM user WHERE username = ? AND password = ?';
			let stmt = db.prepare(check);
			let password = bcrypt.hashSync("Admin1234567", salt);
			let test = stmt.get([req.username, password], (err, row) => {
				if(err) throw err;
				console.log("ROW:");
				console.log(row);
			});*/
            res.status(200).send({
                message: 'Auth',
            });
     }
    });
};