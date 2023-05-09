const express = require('express');
const path = require('path');
const application = express();

application.listen(3000, () => {
    console.log("Server is running on port!")
});

application.use(express.static(path.join(__dirname, 'public')));

application.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/main.html');
});

application.get('/analytics.html', (req, res) => {

    application.use(express.static(path.join(__dirname, 'public')));
    res.sendFile(__dirname + '/public/analytics.html');

});

application.get('/main.html',(req, res) => {

    application.use(express.static(path.join("/Users/karinavladykina/WebstormProjects/biocad-test-task/main.html")));
    res.sendFile("/Users/karinavladykina/WebstormProjects/biocad-test-task/main.html");

});

application.get('*', (req, res) => {

    application.use(express.static(path.join(__dirname, 'public')));
    res.sendFile(__dirname + '/public/error.html');

});
