module.exports = (app) => {

    app.get('/', (_, res, __) => {
        res.redirect('/api');
    });

    app.get('/api', (_, res, __) => {
        res.status(200).send({
            message: 'Portal_MNE_PT API',
        });
    });

    require('./auth.js')(app);
    require('./user.js')(app);
    require('./story.js')(app);
    require('./appointment')(app);
    require('./delivery.js')(app);
    require('./visa_request.js')(app);
    require('./message.js')(app);
    require('./ip_client.js')(app);
    require('./comm_keys.js')(app);
};
