const http = require('http');
const fs = require('fs');
const path = require('path')

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`) 

const server = http.createServer((req, res) => {
    console.log("Server request");
    console.log("For test")
    console.log(req.url, req.method);

    res.setHeader('Content-Type', 'text/html')
    let baseUrl = '';

    switch (req.url) {
        case '/':
            baseUrl = createPath('index')
            break;
        case '/about':
            res.statusCode = 301;
            res.setHeader('Location', '/contacts');
            res.end();
            break;
        case '/contacts':
            baseUrl = createPath('success')
            break;
        default:
            baseUrl = createPath('error') 
            res.statusCode = 404;
            break;
    }

    // res.write('<h1>Hello world!<h1>');

    fs.readFile(baseUrl, (err, data) => {
        if(err) {
            console.log(err)
            res.end();
        } else {
            res.write(data);
            res.end()
        }
    })
})

server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`Listening port ${PORT}`)
})