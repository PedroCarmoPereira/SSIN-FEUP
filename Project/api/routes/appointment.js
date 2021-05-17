const db = require("../db/database.js");

//TO TEST:
//curl -X POST -H "Content-Type: application/json" -d '{"requester_id":"1", "motive":"Test", "set_date":"2021-01-20 20:20:20"}' http://localhost:8010/api/appointment
module.exports = (app) => {
    app.get("/api/appointment", (_, res, __) => {
        var sql = "select * from appointment"
        var params = []
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
    });

	app.post('/api/appointment', (req, res) => {
        if (req.body.token === undefined || req.body.requester_id === undefined || req.body.motive === undefined || req.body.set_date === undefined){
            res.status(403).send({
                message:'Must set all request fields',
            });
        }
        else {
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
    });
};