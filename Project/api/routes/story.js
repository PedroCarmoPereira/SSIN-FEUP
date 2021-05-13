const db = require("../db/database.js");

module.exports = (app) => {
    app.get("/api/stories", (_, res, __) => {
        var sql = "select * from story"
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
};