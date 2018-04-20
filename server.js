const express = require('express');
const path = require('path');
const helmet = require('helmet');

const port = 8080;

const app = express();

app.use(helmet());

app.use(express.static(path.join(__dirname, 'dist')));
app.all('*', (req, res) => res.sendFile(__dirname + '/dist/index.html'));

app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`));
