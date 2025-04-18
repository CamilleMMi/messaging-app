const { io } = require("socket.io-client");

const socket = io("http://localhost:3001", {
    auth: {
        userId: "12345"
    },
    withCredentials: true,
});

for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        socket.emit("myCustomEvent", { data: `Hello Server! ${i}` });
    }, 3000);
}

socket.on("connect", () => {
    console.log("✅ Connected to server with ID:", socket.id);
});

socket.on("disconnect", () => {
    console.log("❌ Disconnected from server");
});

socket.on("connect_error", (err) => {
    console.error("Connection error:", err.message);
});
