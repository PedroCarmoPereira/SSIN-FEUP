const db = require("../db/database.js");

module.exports = (app) => {
    app.get("/api/stories", (req, res, __) => {
        var sql = "select * from story"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.status(200).json({
                "message": "success",
                "data": rows
            })
        });
    });

    app.post("/api/stories", (req, res, _) => {

        if (req.header('Authorization') === undefined) {
            res.status(401).json({ "error": "Unauthorized" });
            return;
        }

        if (req.body.title === undefined || req.body.article === undefined){
            res.status(400).json({
                "message": "Missing Parameters",
            });
            return;
        }
        let select = 'SELECT * FROM user WHERE token = ?';
        db.get(select, [req.header('Authorization')], (err, row) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            if (!row) {
                res.status(401).json({ "error": "Invalid Credentials" });
                return;
            }
            let cp = "";
			let sp = "";
			if (req.header('cp') !== undefined) cp = req.header('cp');
			if (req.header('sp') !== undefined) sp = req.header('sp');
            require('./registerip')(row.id, req.connection.remoteAddress, cp, sp);
            if (row.access_lvl >= 1){
                let insert = 'INSERT INTO story (title, article, author_id) VALUES (?,?,?)';
                let stmt = db.prepare(insert);
                stmt.run(req.body.title, req.body.article, row.id, (err) => {
                    if (err){
                        console.log(err);
                        res.status(400).json({
                        "message": "Unable to submit story",
                        });
                        return;
                    }
                    
                    res.status(200).json({
                        "message": "Story successfully submitted",
                    });
              });
            } else {
                res.status(403).json({
                    "message": "Story not submitted",
                });
            }
        });  
    });

   app.delete("/api/stories/:id", (req, res, _) => {

        if (req.header('Authorization') === undefined) {
            res.status(401).json({ "error": "Unauthorized" });
            return;
        }

        let select = 'SELECT * FROM user WHERE token = ?';
        db.get(select, [req.header('Authorization')], (err, row) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            if (!row) {
                res.status(401).json({ "error": "Invalid Credentials" });
                return;
            }
            let cp = "";
			let sp = "";
			if (req.header('cp') !== undefined) cp = req.header('cp');
			if (req.header('sp') !== undefined) sp = req.header('sp');
            require('./registerip')(row.id, req.connection.remoteAddress, cp, sp);
            if (row.access_lvl >= 1){
            let del = 'DELETE FROM story WHERE story.id = ?';
            let stmt = db.prepare(del);
            stmt.run(req.params.id, (err) => {
                if (err){
                    console.log(err);
                    res.status(400).json({
                    "message": "Unable to remove story",
                    });
                    return;
                }
                
                    res.status(200).json({
                        "message": "Story successfully removed",
                    });
                });
            }
            else {
                res.status(403).json({
                    "message": "Story not removed",
                });
            }
        });
        
    });
};