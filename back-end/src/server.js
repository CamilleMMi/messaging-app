// Externals Libraries
const express = require('express');
const { createServer } = require('node:http');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Configuration Files
const envConfiguration = require('./configurations/env.configuration-1.0.0');
const socketConfiguration = require('./configurations/socket.configuration-1.0.0');
const mongoConfiguration = require('./configurations/mongo.configuration-1.0.0');

// Middlewares
const errorMiddleware = require('./middlewares/error.middleware-1.0.0');

// Routes
const routes = require('./routes');

const { port, cors_origin } = envConfiguration;

mongoConfiguration();

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: cors_origin,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));

routes(app);

app.use(errorMiddleware);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

socketConfiguration(server);