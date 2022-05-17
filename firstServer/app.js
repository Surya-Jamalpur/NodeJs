const http = require('http');
const fileSystem = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write(`
    <html>
    <head>
    <title>This is my first Node Response</title>
    <body>
    <h1>This is my first Form page using Node Response</h1>
    <form action='/message' method='POST'>
        <input type='text' name='message' />
        <button type='submit'>Send</button>
    </form>    
    </body>
    </head>
    </html>
    `);
        return res.end()
    }
    if (url === '/message' && method == 'POST') {
        const msgBody = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            msgBody.push(chunk);
        });
        req.on('end', () => {
            let msgEntered = Buffer.concat(msgBody).toString();
            console.log(msgEntered);
            msgEntered = msgEntered.split('=')[1];
            const pureMsg = msgEntered.replace('+', ' ');//value will be something added spaces
            fileSystem.writeFile('msg.txt', pureMsg, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        })

    }
    res.setHeader('Content-Type', 'text/html');
    res.write(`
    <html>
    <head>
    <title>This is my first Node Response</title>
    <body>
    <h1>This is my first Node Response</h1>    
    </body>
    </head>
    </html>
    `);
    res.end()
})
server.listen(3000);