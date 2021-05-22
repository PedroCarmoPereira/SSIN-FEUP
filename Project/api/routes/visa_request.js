const db = require("../db/database.js");

module.exports = (app) => {
    app.get("/api/visas", (req, res, __) => {
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
            if (row.access_lvl >= 1) {
                var select_all = "SELECT * FROM visa_request";

                db.all(select_all, [], (err, rows) => {
                    if (err) {
                        res.status(400).json({ "error": err.message });
                        return;
                    }
                    res.status(200).json({
                        "message": "Successfully retrieved all visa requests",
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

    app.get("/api/visas/:id", (req, res, __) => {
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
            var user = row;
            var select_one = "SELECT * FROM visa_request WHERE id = ?";

            db.get(select_one, [req.params.id], (err, row) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }
                if (!row) {
                    res.status(404).json({ "error": "Visa request not found" });
                    return;
                }
                if (user.access_lvl >= 1 || user.id == row.requester_id) {
                    res.status(200).json({
                        "message": "Successfully retrieved the visa request",
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

    app.post("/api/visas", (req, res, __) => {
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
            var insert_visa = "INSERT INTO visa_request (motive, applied, requester_id) VALUES (?,?,?)";
            var params = [req.body.motive, req.body.applied, req.body.requester_id];

            if (req.body.motive && req.body.applied && req.body.requester_id) {
                if (row.access_lvl >= 1 || req.body.requester_id == row.id) {
                    let stmt = db.prepare(insert_visa);
                    stmt.run(params, (err, _) => {
                        if (err) {
                            res.status(400).json({ "error": err.message });
                            return;
                        }
                        res.status(200).json({
                            "message": "Successfully created new visa request",
                            "data": params
                        })
                    });
                }
                else {
                    res.status(401).json({ "error": "Current user cannot create visa requests for other people" });
                    return;
                }
            }
            else {
                res.status(400).json({ "error": "Missing parameters" });
            }
        });
    });

    app.put("/api/visas/:id", (req, res, __) => {
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
            if (row.access_lvl >= 2) {
                var find_visa = "SELECT * FROM visa_request WHERE id = ?";

                db.get(find_visa, [req.params.id], (err, row) => {
                    if (err) {
                        res.status(400).json({ "error": err.message });
                        return;
                    }
                    if (!row) {
                        res.status(404).json({ "error": "Visa request not found" });
                        return;
                    }

                    var update_visa = "UPDATE visa_request SET motive = ?, applied = ?, requester_id = ?, accepted = ? WHERE id = ?";
                    var params = [req.body.motive, req.body.applied, req.body.requester_id, req.body.accepted, req.params.id];

                    if (req.body.motive && req.body.applied && req.body.requester_id && req.body.accepted) {
                        let stmt = db.prepare(update_visa);
                        stmt.run(params, (err, _) => {
                            if (err) {
                                res.status(400).json({ "error": err.message });
                                return;
                            }
                            res.status(200).json({
                                "message": "Successfully updated the visa request",
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

    app.delete("/api/visas/:id", (req, res, __) => {
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
            var user = row;
            var find_visa = "SELECT * FROM visa_request WHERE id = ?";

            db.get(find_visa, [req.params.id], (err, row) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }
                if (!row) {
                    res.status(404).json({ "error": "Visa request not found" });
                    return;
                }

                if (user.access_lvl >= 2 || row.requester_id == user.id) {
                    var delete_visa = "DELETE FROM visa_request WHERE id = ?";

                    let stmt = db.prepare(delete_visa);
                    stmt.run([req.params.id], (err, _) => {
                        if (err) {
                            res.status(400).json({ "error": err.message });
                            return;
                        }
                        res.status(200).json({
                            "message": "Successfully deleted the visa request",
                        })
                    });
                }
                else {
                    res.status(401).json({ "error": "Current user cannot delete visa requests from other people" });
                    return;
                }
            });
        });
    });
};