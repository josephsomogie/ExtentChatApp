import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";

const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    
    socket.on('joinConversation', ({ convoId }) => {
        //if (convoId) {
          socket.join(convoId);
          console.log(`Socket ${socket.id} joined conversation ${convoId}`);
        //}
      });
  
      socket.on('messageSent', ({ convoId }) => {
       // if (convoId) {
          socket.to(convoId).emit('fetchMessages');
        //}
      });
    
  });

  

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});