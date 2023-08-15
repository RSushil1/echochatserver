// import express from 'express';
// import dotenv from 'dotenv';
// import http from 'http'; // Import the http module
// import { Server } from 'socket.io';
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoute.js";
// import cors from "cors";


// //configure env
// dotenv.config();

// //databse config
// connectDB();

// //PORT
// const PORT = process.env.PORT || 8000;


// //rest object
// const app = express();
// const server = http.createServer(app); // Create HTTP server instance


// //middelwares
// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//   credentials: true,
// }));
// // app.use(express.json());

// // Increase payload size limits for JSON and URL-encoded bodies
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));

// // Socket.IO configuration
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//     credentials: true
//   }
// }); // Pass the HTTP server instance to the Socket.IO Server

// io.on('connection', socket => {
//   const id = socket.handshake.query.id;
//   socket.join(id);

//   socket.on('send-message', ({ recipients, text }) => {
//     recipients.forEach(recipient => {
//       const newRecipients = recipients.filter(r => r !== recipient);
//       newRecipients.push(id);
//       io.to(recipient).emit('receive-message', {
//         recipients: newRecipients,
//         sender: id,
//         content: text,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       });
//     });
//   });
// });




// //routes
// app.use("/api/auth", authRoutes);

// //run listen
// server.listen(PORT, () => {
//   console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
// });


import express from 'express';
import https from 'https'; // Import the https module
import fs from 'fs'; // Import the fs module to read SSL certificates
import { Server } from 'socket.io';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import path from "path"; // Import the path module

// configure env
dotenv.config();

// database config
connectDB();

// PORT
const PORT = process.env.PORT || 8000;

// SSL certificate options
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'private.key')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'certificate.crt')),
  // ca: fs.readFileSync(path.join(__dirname, 'ssl', 'ca_bundle.crt')), // Include this if you have a ca_bundle
};

// rest object
const app = express();
const server = https.createServer(sslOptions, app); // Create HTTPS server instance

// middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Socket.IO configuration
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true
  }
});

io.on('connection', socket => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient);
      newRecipients.push(id);
      io.to(recipient).emit('receive-message', {
        recipients: newRecipients,
        sender: id,
        content: text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    });
  });
});

// routes
app.use("/api/auth", authRoutes);

// run listen
server.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});


