let express = require("express")
let app = express()
let mongoose = require("mongoose")
let cors = require("cors")
let dotenv = require("dotenv")
dotenv.config()
const { createServer } = require('node:http');
const { Server } = require("socket.io")
const user = require("./models/user.model")
const router = require("./routes/user.routes")
const mRouter = require("./routes/meeting.routes")
const { connectToSocket } = require("./controller/socketManager")
const meeting = require("./models/meeting.model")
const authMiddleware = require("./middleware/authMiddleware")
const cookieParser = require("cookie-parser");
app.use(cookieParser());


const server = createServer(app);
const io = connectToSocket(server)



app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/user", router)
app.use("/api/meetings", authMiddleware, mRouter)

mongoose.connect(process.env.MOURl).then(() => {
    console.log("connected")
    server.listen(process.env.PORT, () => {
        console.log("port connected")
    })
})