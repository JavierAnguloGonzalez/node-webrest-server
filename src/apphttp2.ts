import fs, { write } from 'fs';
import http2 from 'http2';


const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
},
(req, res) => {
    console.log(req.url);
    // res.write('Hello World!');  
    // res.end();


    // const data = { name: 'John Doe', age: 30, city: 'New York' };
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end(JSON.stringify(data));

    if ( req.url === '/'){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
        return;
    } 
    if (req.url?.endsWith('.js')){
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
    }else if(req.url?.endsWith('.css')){
        res.writeHead(200, { 'Content-Type': 'text/css' });
    }
try{
    const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
    res.end(responseContent);

}catch{

    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end();

}
    

});



server .listen(3000);

console.log('Hello World!');