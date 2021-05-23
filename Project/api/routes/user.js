const db = require("../db/database.js");

module.exports = (app) => {

    app.get("/api/token", (req, res, __) => {
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
                res.status(404).json({ "error": "Invalid Token" });
                return;
            }
            else {
                res.status(200).json({ "message": "Valid token" });
                console.log("Validated Token");
                return;
            }
        })
    });

    app.get("/api/users", (req, res, __) => {
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
            if (!row || row.access_lvl < 1) {
                res.status(401).json({ "error": "Unauthorized" });
                return;
            }

            require('./registerip')(row.id, req.connection.remoteAddress);
            var sql = "select * from user"
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
    });

    app.get("/api/user", (req, res, __) => {
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
            res.status(200).json({
                "message": "Successfully retrieved user",
                "data": row
            })
        })
    });
};