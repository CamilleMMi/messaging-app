const express = require('express');
//const errorMiddleware = require('./middlewares/errorMiddleware');
const envConfiguration = require('./configurations/env.configuration-1.0.0');
const mongoConfiguration = require('./configurations/mongo.configuration-1.0.0');
const routes = require('./routes');

const { port } = envConfiguration;

mongoConfiguration();

const app = express();

app.use(express.json());
//app.use(cors());

routes(app);

//app.use(errorMiddleware);

app.listen(port, () => console.log(`Server running on port ${port}`));