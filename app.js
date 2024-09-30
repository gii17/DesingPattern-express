require('dotenv').config(); 
const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const port       = process.env.PORT || 3000;
const Connection  = require('./Databases/Connection/sequalize');

app.use(bodyParser.json());
app.use(express.json());

const routes = require('./Routes/routes');
app.use('/api', routes);

app.listen(port, async () => {
    console.log(`Server berjalan di port ${port}`);
    try {
        await Connection.sync();
    } catch (error) {
        console.error('Gagal menyinkronkan:', error);
    }
});

module.exports = app;
