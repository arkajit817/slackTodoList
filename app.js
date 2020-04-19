const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const nocache = require('nocache');



const app = express();


const port = process.env.PORT || 8000;


console.log(`NODE_ENV: ${app.get('env')}`);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Adding middleware

app.use(cors());
// app.use(bodyparser.json({ limit: '50mb', extended: true }));
app.use(bodyparser.urlencoded({ extended: false }))


app.use(nocache());

require('./startup/routes')(app);
require('./startup/db')();

if (process.env.NODE_ENV == 'production') {
    require('./startup/prod')(app);
}

app.listen(port, () => {
    console.log('Server started at port ' + port);
});
