const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(express.static('.'));
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('./index.html')
})

app.listen(8080, () => {
    console.log('server running')
})