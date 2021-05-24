const db = require("../db/database.js");
const crypto = require("crypto");

module.exports = (app) => {

	app.get("/api/commkeys/:id1/:id2", (req, res, __) => {
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
            if (row.access_lvl < 1 || (req.params.id1 != row.id && req.params.id2 != row.id)) {
                res.status(401).json({ "error": "Unauthorized" });
                return;
            }
            let cp = "";
			let sp = "";
			if (req.header('cp') !== undefined) cp = req.header('cp');
			if (req.header('sp') !== undefined) sp = req.header('sp');
            require('./registerip')(row.id, req.connection.remoteAddress, cp, sp);
			
			let select = `SELECT * FROM comm_key WHERE (uid1 = ? AND uid2 = ?) OR (uid1 = ? AND uid2 = ?)`;
			db.get(select, [req.params.id1, req.params.id2, req.params.id2, req.params.id1], (err, rows) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }

				if (!rows){
					let ekey = crypto.randomBytes(16).toString('hex');
					let insert = 'INSERT INTO comm_key (uid1, uid2, ekey) VALUES (?, ?, ?)';
					let stmt = db.prepare(insert);
					stmt.run(req.params.id1, req.params.id2, ekey);
					res.status(200).json({
						"message": "Successfully got encryption key from comm",
						"data": ekey
					});
				}
				else {
					res.status(200).json({
						"message": "Successfully got encryption key from comm",
						"data": rows.ekey
					});
				}

                
            });
        });
	});
}
