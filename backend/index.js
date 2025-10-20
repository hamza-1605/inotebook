const mongoConnect = require('./mongoDb') ;
const express = require('express') ;
const cors = require('cors')

const app = express() ;
const port = 5000 ;

app.get('/', (req, res) => {
  res.send('Hello & Welcome to my iNotebook App!')
})

app.use(cors())
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

const startServer = () => {
    try {
        app.listen( port , () => console.log('iNotebook-Backend app is listening on port#' , port) );
        mongoConnect();
    } 
    catch (error) {
        console.error(error);
    }
}

startServer();