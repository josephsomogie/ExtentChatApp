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
    console.log("TEST")
    socket.on('joinConversation', ({ convoId }) => {
        //if (convoId) {
          socket.join(convoId);
          console.log(socket.id, 'joined room ', convoId);
        //}
      });
      socket.on('leaveConversation',({convoId})=>{
        socket.leave(convoId);
        console.log(socket.id, 'left room ', convoId);
      });
  
      socket.on('messageSent', ({ convoId }) => {
        //if (convoId) {
          socket.to(convoId).emit('fetchMessages');
        //}
      });
      socket.on('isTyping', ({convoId}) => {
        socket.to(convoId).emit('userTyping')
      }
    );
    socket.on('notTyping', ({convoId}) => {
      socket.to(convoId).emit('notTyping')
    }
  );
  socket.on("disconnect", () => {
    // socket.rooms.size === 0
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