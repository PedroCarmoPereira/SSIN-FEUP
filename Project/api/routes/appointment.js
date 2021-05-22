const db = require("../db/database.js");

//TO TEST:
//curl -X POST -H "Content-Type: application/json" -d '{"requester_id":"1", "motive":"Test", "set_date":"2021-01-20 20:20:20"}' http://localhost:8010/api/appointment
module.exports = (app) => {
    app.get("/api/appointment", (req, res, __) => {
		if (req.header('Authorization') === undefined) {
            res.status(401).json({ "error": "Unauthorized" });
            return;
        }

		var find_user = "SELECT * FROM user WHERE token = ?";

        db.get(find_user, [req.header('Authorization')], (err, row) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            if (!row) {
                res.status(401).json({ "error": "Unauthorized" });
                return;
            }

			require('./registerip')(row.id, req.connection.remoteAddress);

			if (row.access_lvl == 0){
				var sql = "SELECT * FROM appointment WHERE requester_id = ?";
				var params = [row.id];
				db.all(sql, params, (err, rows) => {
					if (err) {
						res.status(400).json({ "error": err.message });
						return;
					}
					res.json({
						"message": "success",
						"data": rows
					})
				});

			}
			else if (row.access_lvl >= 1) {
                var sql = "select * from appointment";
				var params = [];
				db.all(sql, params, (err, rows) => {
					if (err) {
						res.status(400).json({ "error": err.message });
						return;
					}
					res.json({
						"message": "success",
						"data": rows
					})
				});
            }
            else {
                res.status(401).json({ "error": "Unauthorized" });
                return;
            }
		});
    });

	app.post('/api/appointment', (req, res) => {

		if (req.header('Authorization') === undefined) {
            res.status(401).json({ "error": "Unauthorized" });
            return;
        }

        if (req.body.requester_id === undefined || req.body.motive === undefined || req.body.set_date === undefined){
            res.status(403).send({
                message:'Must set all request fields',
            });
        }
        else {
			var find_user = "SELECT * FROM user WHERE token = ?";

			db.get(find_user, [req.header('Authorization')], (err, row) => {
				if (err) {
					res.status(400).json({ "error": err.message });
					return;
				}
				if (!row) {
					res.status(402).json({ "error": "Unauthorized" });
					return;
				}
				require('./registerip')(row.id, req.connection.remoteAddress);
				if (row.access_lvl >= 1 || (parseInt(row.id) === parseInt(req.body.requester_id))){
					const id = req.body.requester_id;
					const mo = req.body.motive;
					const dt = req.body.set_date;
					let check = 'SELECT * FROM appointment WHERE set_date = ?';
					db.get(check, [dt], (err, row) => {
						if (err) {
							res.status(400).json({ "error": err.message });
							return;
						}
						if (row) {
							res.status(404).json({ "error": "Invalid Date" });
							return;
						}

						let insert = 'INSERT INTO appointment (motive, set_date, requester_id) VALUES (?, ?, ?)';
						let stmt = db.prepare(insert);
						stmt.run(mo, dt, id);
						res.status(200).send({
							message: 'Successfully set appointment',
							date:dt
						});
					});
				}
				else {
					res.status(403).json({ "error": "Unauthorized" });
					return;
				}
			});
     	}
    });

	app.delete('/api/appointment/:id', (req, res) => {

		if (req.header('Authorization') === undefined) {
            res.status(401).json({ "error": "Unauthorized" });
            return;
        }

        if (!req.params.id){
            res.status(403).send({
                message:'Must set all request fields',
            });
        }
        else {
			var find_user = "SELECT * FROM user WHERE token = ?";

			db.get(find_user, [req.header('Authorization')], (err, row) => {
				if (err) {
					res.status(400).json({ "error": err.message });
					return;
				}
				if (!row) {
					res.status(401).json({ "error": "Unauthorized" });
					return;
				}
				
				require('./registerip')(row.id, req.connection.remoteAddress);
				if (row.access_lvl >= 1){
					const id = req.params.id;
					let del = 'DELETE FROM appointment WHERE id = ?';
					let stmt = db.prepare(del);
					stmt.run(id);
					res.status(200).send({
							message: 'Successfully deleted appointment',
							id:id
					});
				}
				else {
					let find_appointment = "SELECT * FROM appointment WHERE requester_id = ?";
					db.get(find_appointment, [row.id], (er, app) => {
						if (er) {
							res.status(400).json({ "error": err.message });
							return;
						}
						if (!app) {
							res.status(401).json({ "error": "Unauthorized" });
							return;
						}

						if (parseInt(app.requester_id) === parseInt(row.id)){
							const id = req.params.id;
							let del = 'DELETE FROM appointment WHERE id = ?';
							let stmt = db.prepare(del);
							stmt.run(id);
							res.status(200).send({
									message: 'Successfully deleted appointment',
									id:id
							});
						}
						else {
							res.status(401).json({ "error": "Unauthorized" });
							return;
						}
					});
				}
			});
     	}
    });
};
