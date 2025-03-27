import http from 'http';
import app from './app.js';

const server = http.createServer(app);

const port = process.env.PORT;
server.listen(port,(err) => {
    if(err) {
        console.log(`Error starting server: ${err}`);
    }
    console.log(`server running on ${port}`);
})