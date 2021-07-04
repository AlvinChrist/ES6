const http = require('http')
const requestListener = (request,response)=>{
    response.setHeader('Content-Type','application/json')
    response.setHeader('X-Powered-By','NodeJS')
    response.statusCode = 200;
    // const method = request.method
    const {method,url} = request //mengambil method requests [GET,POST,PUT,DELETE]
    if(url==='/'){
        switch(method){
            case 'GET':
                response.end(JSON.stringify({
                    "message":"Ini adalah Homepage",
                }))
                break;
            default:
                response.statusCode = 400
                response.end(JSON.stringify({
                    "message" : `Halaman tidak dapat diakses dengan ${method} request`,
                }))
                break;
        }
    }
    else if(url==='/about'){
        switch(method){
            case 'GET':
                response.end(JSON.stringify({
                    "message":`Halo! Ini adalah halaman about!`,
                }))
                break;
            case 'POST':
                let body = []

                request.on('data',(chunk)=>{
                    body.push(chunk)
                })

                request.on('end',()=>{
                    body = Buffer.concat(body).toString()
                    const {name} = JSON.parse(body);
                    response.end(JSON.stringify({
                        "message" : `Halo, ${name}! Ini adalah halaman about`
                    }))
                })
                break;
            default:
                response.statusCode = 400
                response.end(JSON.stringify({
                    "message" : `Halaman tidak dapat diakses menggunakan ${method} request`,
                }))
                break;
        }
    }
    else{
        response.statusCode = 404;
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan!',
        }));
    }
}

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port,host,()=>{
    console.log(`Server berjalan pada http://${host}:${port}`)
})