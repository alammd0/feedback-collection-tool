import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import "dotenv/config";
import adminRoutes from "./routes/adminRoutes";
import productRoutes from "./routes/productRoute";
import feedbackRoutes from "./routes/feedbackRoutes";

const app = express();
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/feedback", feedbackRoutes);

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  socket.on("newFeedback", (data) => {
    console.log("New feedback received via socket:", data);

    io.emit("feedbackUpdate", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

export { io };


app.get("/", (req, res) => {
  res.send(`<h1>App Successfully Published </h1>`);
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
