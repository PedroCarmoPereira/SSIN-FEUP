const db = require("../db/database.js");
const express = require('express');


module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

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

    //To test:
    //curl -X POST -H "Content-Type: application/json" -d '{"author_id": "2", "title": "linuxize@example.com", "article":"Tarticle"}' http://localhost:8010/api/stories
    app.post("/api/stories", (req, res, _) => {
        if (req.body.author_id === undefined || req.body.title === undefined || req.body.article === undefined){
            res.status(400).json({
                "message": "Missing Parameters",
            });
            return;
        }
        //console.log(req.body);
        let insert = 'INSERT INTO story (title, article, author_id) VALUES (?,?,?)';
        let stmt = db.prepare(insert);
        stmt.run(req.body.title, req.body.article, req.body.author_id, (err) => {
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
        
    });
};