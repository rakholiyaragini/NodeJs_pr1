const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    const random = `${Math.floor(Math.random() * 1000)} - ${req.url} :: New Request`;
    fs.appendFile('demo.txt', random, () => {
        console.log("file created", random);
    })
    console.log(req.url);
    if (req.url === '/') {
        fs.readFile('./index.html', 'utf-8', (err, data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        })
    } else if (req.url === '/about') {
        fs.readFile('./about.html', 'utf-8', (err, data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        })
    } else {
        fs.readFile('./Error.html', 'utf-8', (err, data) => {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        })
    }
});

server.listen(5000, () => {

    console.log(`Server running at http://localhost:5000/`);
})