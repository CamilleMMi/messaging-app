const socketIo = require('socket.io');
const envConfiguration = require('./env.configuration-1.0.0');

const { cors_origin } = envConfiguration;

const socketConfiguration = (server) => {
    const io = new socketIo.Server(server, {
        cors: {
            origin: cors_origin,
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    const usersSocketMap = new Map();

    io.on("connection", (socket) => {
        const userId = socket.handshake.auth.userId;

        if (userId) {
            usersSocketMap.set(userId, socket.id);
            console.log(`User : ${userId} Socket : ${socket.id}.`);
        } else {
            console.log("User ID not provided.");
        }

        socket.on("myCustomEvent", (data) => {
            console.log(`Received custom event from ${userId}:`, data);
        });
        
        socket.on("disconnect", () => {
            usersSocketMap.delete(userId);
            console.log(`User ${userId} disconnected.`);
        });
    });

    console.log("Socket Configuration done\n");
};

module.exports = socketConfiguration;