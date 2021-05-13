module.exports = (app) => {

    app.get('/', function (req, res) {
        res.redirect('/api');
    });

    app.get('/api', (req, res) => {
        res.status(200).send({
            message: 'Portal_MNE_PT API',
        });
    });

    require('./user.js')(app);
    require('./story.js')(app);
};
