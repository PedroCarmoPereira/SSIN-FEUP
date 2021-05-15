module.exports = (app) => {

    app.get('/', (_, res, __) => {
        res.redirect('/api');
    });

    app.get('/api', (_, res, __) => {
        res.status(200).send({
            message: 'Portal_MNE_PT API',
        });
    });

    app.get('/auth', (req, res) => {
        if (req.query.username === undefined || req.query.password === undefined){
            res.status(403).send({
                message:'Must set username and password fields',
            });
        }

        else {
            res.status(200).send({
                message: 'Auth',
            });
     }
    })

    require('./user.js')(app);
    require('./story.js')(app);
};
