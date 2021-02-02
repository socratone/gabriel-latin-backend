require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet')

const routes = require('./src/routes');

app.use(helmet());
app.use(cors());
app.use(express.json()); 
 
app.use('/api/email', routes.email);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`서버가 ${port} 포트에서 가동 중입니다.`));