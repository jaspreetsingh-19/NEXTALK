const { Server } = require("socket.io");

let connections = {};
let messages = {};
let timeOnline = {};
let userNamesMap = {};

const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log("something connected");

        //JOIN-CALL EVENT with username
        socket.on("join-call", (path, username) => {
            if (!connections[path]) connections[path] = [];

            connections[path].push(socket.id);
            timeOnline[socket.id] = new Date();
            userNamesMap[socket.id] = username;

            // Broadcast to others in the room that a user has joined
            for (let i = 0; i < connections[path].length; i++) {
                const socketId = connections[path][i];
                io.to(socketId).emit("user-joined", socket.id, connections[path], userNamesMap);
            }

            // Send chat history if available
            if (messages[path]) {
                for (let a = 0; a < messages[path].length; ++a) {
                    io.to(socket.id).emit(
                        "chat-messages",
                        messages[path][a]["data"],
                        messages[path][a]["sender"],
                        messages[path][a]["socket-id-sender"]
                    );
                }
            }
        });

        //SIGNAL EVENT
        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        });

        //CHAT MESSAGE EVENT
        socket.on("chat-message", (data, sender) => {
            let matchingRoom = "";

            for (let roomKey in connections) {
                if (connections[roomKey].includes(socket.id)) {
                    matchingRoom = roomKey;
                    break;
                }
            }

            if (matchingRoom) {
                if (!messages[matchingRoom]) messages[matchingRoom] = [];

                messages[matchingRoom].push({
                    sender: sender,
                    data: data,
                    "socket-id-sender": socket.id,
                });

                connections[matchingRoom].forEach((userSocketId) => {
                    io.to(userSocketId).emit("chat-message", data, sender, socket.id);
                });
            }
        });


        socket.on("disconnect", () => {
            let disconnectedRoom = "";
            for (let roomKey in connections) {
                const roomUsers = connections[roomKey];
                if (roomUsers.includes(socket.id)) {
                    disconnectedRoom = roomKey;
                    connections[roomKey] = roomUsers.filter((id) => id !== socket.id);


                    delete timeOnline[socket.id];
                    delete userNamesMap[socket.id];


                    connections[roomKey].forEach((userSocketId) => {
                        io.to(userSocketId).emit("user-left", socket.id, userNamesMap);
                    });
                    break;
                }
            }
            console.log("User disconnected:", socket.id);
        });
    });

    return io;
};

module.exports = { connectToSocket };
