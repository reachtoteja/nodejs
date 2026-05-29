const fs = require('fs')

const requestHandler = (req, res)=>{
    const url = req.url
    const method = req.method

    if(url === '/'){
        res.write('<html>')
        res.write('<head><title>My Message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end()
    }

    if(url === '/message' && method === 'POST'){
        const body = []
        req.on('data', (chunk)=>{
            console.log(`chunk: ${chunk}`)
            body.push(chunk)
        })
        return req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString()
            console.log(`parsedBody: ${parsedBody}`)
            const message = parsedBody.split('=')[1]
            console.log(`message: ${message}`)
            fs.writeFile('message.txt', message, (err)=>{
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })
        })
    }

    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>My First Node.js Server</title></head>')
    res.write('<body><h1>Hello, World!</h1></body>')
    res.write('</html>')
    res.end()
}

// moule.exports = requestHandler

// module.exports = {
//     requestHandler: requestHandler,
//     someText: 'Some Hardcoded Text'
// }

// module.exports.requestHandler = requestHandler
// module.exports.someText = 'Some Hardcoded Text'

exports.requestHandler = requestHandler
exports.someText = 'Some Hardcoded Text'