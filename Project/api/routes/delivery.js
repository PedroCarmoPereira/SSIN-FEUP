const db = require("../db/database.js");

module.exports = (app) => {
    app.get("/api/deliveries", (req, res, __) => {
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

            if (row.access_lvl >= 1) {
                var select_all = "SELECT * FROM delivery";

                db.all(select_all, [], (err, rows) => {
                    if (err) {
                        res.status(400).json({ "error": err.message });
                        return;
                    }
                    res.status(200).json({
                        "message": "Successfully retrieved all deliveries",
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

    app.get("/api/deliveries/:id", (req, res, __) => {
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

            var user = row;
            var select_one = "SELECT * FROM delivery WHERE id = ?";

            db.get(select_one, [req.params.id], (err, row) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }
                if (!row) {
                    res.status(404).json({ "error": "Delivery not found" });
                    return;
                }

                if (user.access_lvl >= 1 || user.id === row.employee_id) {
                    res.status(200).json({
                        "message": "Successfully retrieved the delivery",
                        "data": row
                    })
                }
                else {
                    res.status(401).json({ "error": "Unauthorized" });
                    return;
                }
            });
        });
    });

    app.post("/api/deliveries", (req, res, __) => {
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

            if (row.access_lvl === 3) {
                var insert_delivery = "INSERT INTO delivery (employee_id, content, op_date) VALUES (?,?,?)";
                var params = [req.body.employee_id, req.body.content, req.body.op_date];

                if (req.body.employee_id && req.body.content && req.body.op_date) {
                    let stmt = db.prepare(insert_delivery);
                    stmt.run(params, (err, _) => {
                        if (err) {
                            res.status(400).json({ "error": err.message });
                            return;
                        }
                        res.status(200).json({
                            "message": "Successfully created new delivery",
                            "data": params
                        })
                    });
                }
                else {
                    res.status(400).json({ "error": "Missing parameters" });
                }
            }
            else {
                res.status(401).json({ "error": "Unauthorized" });
                return;
            }
        });
    });

    app.put("/api/deliveries/:id", (req, res, __) => {
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

            if (row.access_lvl === 3) {
                var find_delivery = "SELECT * FROM delivery WHERE id = ?";

                db.get(find_delivery, [req.params.id], (err, row) => {
                    if (err) {
                        res.status(400).json({ "error": err.message });
                        return;
                    }
                    if (!row) {
                        res.status(404).json({ "error": "Delivery not found" });
                        return;
                    }

                    var update_delivery = "UPDATE delivery SET employee_id = ?, content = ?, op_date = ? WHERE id = ?";
                    var params = [req.body.employee_id, req.body.content, req.body.op_date, req.params.id];

                    if (req.body.employee_id && req.body.content && req.body.op_date) {
                        let stmt = db.prepare(update_delivery);
                        stmt.run(params, (err, _) => {
                            if (err) {
                                res.status(400).json({ "error": err.message });
                                return;
                            }
                            res.status(200).json({
                                "message": "Successfully updated the delivery",
                                "data": params
                            })
                        });
                    }
                    else {
                        res.status(400).json({ "error": "Missing parameters" });
                    }
                });
            }
            else {
                res.status(401).json({ "error": "Unauthorized" });
                return;
            }
        });
    });

    app.delete("/api/deliveries/:id", (req, res, __) => {
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

            if (row.access_lvl === 3) {
                var find_delivery = "SELECT * FROM delivery WHERE id = ?";

                db.get(find_delivery, [req.params.id], (err, rows) => {
                    if (err) {
                        res.status(400).json({ "error": err.message });
                        return;
                    }
                    if (!rows) {
                        res.status(404).json({ "error": "Delivery not found" });
                        return;
                    }

                    var delete_delivery = "DELETE FROM delivery WHERE id = ?";

                    let stmt = db.prepare(delete_delivery);
                    stmt.run([req.params.id], (err, _) => {
                        if (err) {
                            res.status(400).json({ "error": err.message });
                            return;
                        }
                        res.status(200).json({
                            "message": "Successfully deleted the delivery",
                        })
                    });
                });
            }
            else {
                res.status(401).json({ "error": "Unauthorized" });
                return;
            }
        });
    });
};