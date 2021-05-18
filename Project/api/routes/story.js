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
            res.status(200).json({
                "message": "success",
                "data": rows
            })
        });
    });

    //To test: Get token after register: $2a$10$WgXe7j5vy40zBI/uySd5dusx6oCbaDGDeQESCupaTOSBewrbRv5jm
    //curl -X POST -H "Content-Type: application/json" -d '{"token":"$2a$10$KVYJpPewm6GzqACP22K5b./b15l.sluWn/8g8hQr/zPh7sM1MEQ22", "title": "linuxize@example.com", "article":"Tarticle"}' http://localhost:8010/api/stories
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
        console.log(req.header('Authorization'));
        db.get(select, [req.header('Authorization')], (err, row) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            if (!row) {
                res.status(404).json({ "error": "Invalid Credentials" });
                return;
            }

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
                        "message": "Story successfully submited",
                    });
              });
            } else {
                res.status(403).json({
                    "message": "Story not submited",
                });
            }
        });  
    });

    //To Test
    //curl -X POST -H "Content-Type: application/json" -d '{"title": "linuxize@example.com"}' http://localhost:8010/api/stories/remove
    app.delete("/api/stories", (req, res, _) => {
        if (req.body.token === undefined ||req.body.title === undefined){
            res.status(400).json({
                "message": "Missing Parameters",
            });
            return;
        }
        let select = 'SELECT * FROM user WHERE token = ?';
        db.get(select, [req.body.token], (err, row) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            if (!row) {
                res.status(404).json({ "error": "Invalid Credentials" });
                return;
            }

            if (row.access_lvl >= 1){
            let del = 'DELETE FROM story WHERE story.title = ?';
            let stmt = db.prepare(del);
            stmt.run(req.body.title, (err) => {
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