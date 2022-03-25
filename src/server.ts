require('dotenv').config();
import express from 'express';
const bodyParser = require('body-parser');
const cors = require('cors');
require('body-parser-xml')(bodyParser);

const app = express();

app.use(bodyParser.xml({
    limit: '1MB',   // Reject payload bigger than 1 MB
    xmlParseOptions: {
      normalize: true,     // Trim whitespace inside text nodes
      normalizeTags: true, // Transform tags to lowercase
      explicitArray: false // Only put nodes in array if >1
    }
})); 

app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.APP_PORT, () => {
    console.log('server is running at http://localhost:' + process.env.APP_PORT);
});

const todoRouter = require('./router/todo.router');

app.get('/', (req,res) => res.send('Hello developer'));
app.use('/api/todo', todoRouter)

