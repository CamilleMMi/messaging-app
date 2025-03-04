const express = require('express');
const errorMiddleware = require('./middlewares/error.middleware-1.0.0');
const envConfiguration = require('./configurations/env.configuration-1.0.0');
//const cors = require('cors');
const connectDB = require('./configurations/mongo.configuration-1.0.0');
const routes = require('./routes');

const { port } = envConfiguration;

connectDB();

const app = express();

app.use(express.json());
//app.use(cors());

app.use(express.json());
//app.use(cors());

routes(app);

app.use(errorMiddleware);

app.listen(port, () => console.log(`Server running on port ${port}`));