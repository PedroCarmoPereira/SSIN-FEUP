const db = require("../db/database.js");

module.exports = (app) => {
    app.get("/api/ip_clients", (req, res, __) => {
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
            if (!row || row.access_lvl < 2) {
                res.status(401).json({ "error": "Unauthorized" });
                return;
            }
            var sql = "select * from ip_client"
            var params = []
            db.all(sql, params, (err, rows) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }
                let cp = "";
			    let sp = "";
			    if (req.header('cp') !== undefined) cp = req.header('cp');
			    if (req.header('sp') !== undefined) sp = req.header('sp');
                require('./registerip')(row.id, req.connection.remoteAddress, cp, sp);
                res.json({
                    "message": "success",
                    "data": rows
                })
            });
        });
    });

    app.get("/api/ip_clients/:user_id", (req, res, __) => {
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
            var sql = "select * from ip_client where uid = ?"
            var params = [req.params.user_id]
            db.get(sql, params, (err, rows) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }
                let cp = "";
			    let sp = "";
			    if (req.header('cp') !== undefined) cp = req.header('cp');
			    if (req.header('sp') !== undefined) sp = req.header('sp');
                require('./registerip')(row.id, req.connection.remoteAddress, cp, sp);
                res.json({
                    "message": "success",
                    "data": rows
                })
            });
        });
    });
};