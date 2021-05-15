const db = require("../db/database.js");

module.exports = (app) => {
    app.get("/api/deliveries", (_, res, __) => {
        var sql = "SELECT * FROM delivery"
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

    app.get("/api/deliveries/:id", (req, res, __) => {
        var sql = "SELECT * FROM delivery WHERE id = ?"
        var params = [req.params.id]
        db.get(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            if (!rows) {
                res.status(404).json({ "error": "id not found" });
                return;
            }
            res.json({
                "message": "success",
                "data": rows
            })
        });
    });

    app.post("/api/deliveries", (req, res, __) => {
        var sql = "INSERT INTO delivery (employee_id, content, op_date) VALUES (?,?,?)"
        var params = [req.body.employee_id, req.body.content, req.body.op_date]

        if (req.body.employee_id && req.body.content && req.body.op_date) {
            let stmt = db.prepare(sql);
            stmt.run(params, (err, _) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }
                res.json({
                    "message": "success",
                    "data": params
                })
            });
        }
        else {
            res.status(400).json({ "error": "Missing parameters" });
        }
    });

    app.put("/api/deliveries/:id", (req, res, __) => {
        var sql = "UPDATE delivery SET employee_id = ?, content = ?, op_date = ? WHERE id = ?"
        var params = [req.body.employee_id, req.body.content, req.body.op_date, req.params.id]

        db.get("SELECT * FROM delivery WHERE id = ?", [req.params.id], (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            if (!rows) {
                res.status(404).json({ "error": "id not found" });
                return;
            }
            if (req.body.employee_id && req.body.content && req.body.op_date) {
                let stmt = db.prepare(sql);
                stmt.run(params, (err, _) => {
                    if (err) {
                        res.status(400).json({ "error": err.message });
                        return;
                    }
                    res.json({
                        "message": "success",
                        "data": params
                    })
                });
            }
            else {
                res.status(400).json({ "error": "Missing parameters" });
            }
        });
    });

    app.delete("/api/deliveries/:id", (req, res, __) => {
        var sql = "DELETE FROM delivery WHERE id = ?"
        var params = [req.params.id]

        db.get("SELECT * FROM delivery WHERE id = ?", params, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            if (!rows) {
                res.status(404).json({ "error": "id not found" });
                return;
            }
            let stmt = db.prepare(sql);
            stmt.run(params, (err, _) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }
                res.json({
                    "message": "success",
                })
            });
        });
    });
};