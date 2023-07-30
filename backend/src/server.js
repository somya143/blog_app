require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connect = require("./config/db")
const PORT = process.env.PORT || 8080;
const http = require("http");
const server = http.createServer(app)
const { Server } = require("socket.io");
const authRoute = require("./features/auth/auth.routes");
const blogRoute = require("./features/blog/blogs.routes");
const likeRoute = require("./features/likes/likes.route");
const commentRoute = require("./features/comment/comment.route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const io = new Server(server , {
    cors: {
        origin : "http://localhost:8080"
    }
});
io.on("connection" , (socket) => {
    console.log(`a new user join on ${socket.id}🚀`);
    socket.on("disconnect" , (socket) => {
    console.log(`User disconnected with socket-id: ${socket.id}`)
    });
    socket.on("new-user-signedup", (data) => {
        socket.broadcast.emit("new-user-signedup" , data)
    });
    socket.on("user-login" , (data) => {
        socket.broadcast.emit("user-login" , data)
    });
    socket.on("new-blog" , (data) => {
        socket.broadcast.emit("new-blog",data)
    });
    socket.on("delete-blog" , (data) => {
        socket.broadcast.emit("delete-blog" , data)
    })
    socket.on("new-comment" , (data) => {
        socket.broadcast.emit("new-comment",data)
    });
    socket.on("remove-comment" , (data) => {
        socket.broadcast.emit("remove-comment" , data)
    })
    socket.on("add-like" , (data) => {
        socket.broadcast.emit("add-like" , data)
    });
    socket.on("remove-like" , (data) => {
        socket.broadcast.emit("remove-like" , data)
    });
    socket.on("update-blog" , (data) => {
        socket.broadcast.emit("update-blog" , data)
    })

})

app.use("/auths" , authRoute);
app.use("/blogs" , blogRoute);
app.use("/likes" , likeRoute);
app.use("/comments" , commentRoute);
server.listen(PORT , async() => {
    await connect();
    console.log(`PORT is running on ${PORT}`);
})
// PORT = 8080
// MONGO_URI = mongodb+srv://raj:raj@cluster0.cb7b3hu.mongodb.net/blog-app?retryWrites=true&w=majority
// CLIENT_URI = http://localhost:3000