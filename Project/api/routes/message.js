const db = require("../db/database.js");

module.exports = (app) => {
    app.get("/api/messages", (req, res, __) => {
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
                var select_all = "SELECT * FROM message WHERE sender_id = ? OR receiver_id = ?";

                db.all(select_all, [row.id, row.id], (err, rows) => {
                    if (err) {
                        res.status(400).json({ "error": err.message });
                        return;
                    }
                    res.status(200).json({
                        "message": "Successfully retrieved all messages",
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

    app.get("/api/messages/:id", (req, res, __) => {
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
            var select_one = "SELECT * FROM message WHERE id = ?";

            db.get(select_one, [req.params.id], (err, row) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }
                if (!row) {
                    res.status(404).json({ "error": "Message not found" });
                    return;
                }

                if (user.access_lvl >= 1 && (user.id == row.sender_id || user.id == row.receiver_id)) {
                    res.status(200).json({
                        "message": "Successfully retrieved the message",
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

    app.get("/api/messages/:id1/:id2", (req, res, __) => {
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
            require('./registerip')(row.id, req.connection.remoteAddress);
            var select = "SELECT * FROM message WHERE sender_id = ? AND receiver_id = ?";

            db.all(select, [req.params.id1, req.params.id2], (err, rows) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }
                res.status(200).json({
                    "message": "Successfully retrieved the messages",
                    "data": rows
                })
            });
        });
    });

    app.post("/api/messages", (req, res, __) => {
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
            if (row.access_lvl == 0) {
                res.status(401).json({ "error": "Unauthorized" });
                return;
            }
            require('./registerip')(row.id, req.connection.remoteAddress);
            var insert_message = "INSERT INTO message (sender_id, receiver_id, content, sent_date) VALUES (?,?,?,?)";
            var params = [req.body.sender_id, req.body.receiver_id, req.body.content, req.body.sent_date];

            if (req.body.sender_id && req.body.receiver_id && req.body.content && req.body.sent_date) {
                if (req.body.sender_id == row.id) {
                    let stmt = db.prepare(insert_message);
                    stmt.run(params, (err, _) => {
                        if (err) {
                            res.status(400).json({ "error": err.message });
                            return;
                        }
                        res.status(200).json({
                            "message": "Successfully created new message",
                            "data": params
                        })
                    });
                }
                else {
                    res.status(401).json({ "error": "The creator of the message needs to also be the sender" });
                    return;
                }
            }
            else {
                res.status(400).json({ "error": "Missing parameters" });
            }
        });
    });
};