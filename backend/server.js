// const http = require('http') ;
// const { Server } = require('socket.io') ;
const express = require('express') ;
const connectToDB = require("./database/db.js");
const dotenv = require('dotenv') ;
const path = require('path') ;
const productRouter = require("./routers/productRouter.js");
const userRouter = require("./routers/userRouter.js");
const orderRouter = require("./routers/orderRouter.js");
const uploadRouter = require('./routers/uploadRouter.js') ;
const cors = require("cors");

dotenv.config({
  path : "../.env"
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//CORS 미들웨어 설정
const corsOptions  = {
  origin: process.env.CLIENT_ORIGEN || "http://7zone.co.kr"
};
console.log("CLIENT_ORIGIN     " + process.env.CLIENT_ORIGIN)
app.use(cors(corsOptions));


connectToDB();

app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/api/config/google', (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || '');
});
const dirname = path.resolve();
app.use('/uploads', express.static(path.join(dirname, '/uploads')));
app.use(express.static(path.join(dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(dirname, '/frontend/build/index.html'))
);
app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});


// const httpServer = http.Server(app);
// const io = new Server(httpServer, { cors: { origin: '*' } });
// const users = [];
//
// io.on('connection', (socket) => {
//   console.log('connection', socket.id);
//   socket.on('disconnect', () => {
//     const user = users.find((x) => x.socketId === socket.id);
//     if (user) {
//       user.online = false;
//       console.log('Offline', user.name);
//       const admin = users.find((x) => x.isAdmin && x.online);
//       if (admin) {
//         io.to(admin.socketId).emit('updateUser', user);
//       }
//     }
//   });
//   socket.on('onLogin', (user) => {
//     const updatedUser = {
//       ...user,
//       online: true,
//       socketId: socket.id,
//       messages: [],
//     };
//     const existUser = users.find((x) => x._id === updatedUser._id);
//     if (existUser) {
//       existUser.socketId = socket.id;
//       existUser.online = true;
//     } else {
//       users.push(updatedUser);
//     }
//     console.log('Online', user.name);
//     const admin = users.find((x) => x.isAdmin && x.online);
//     if (admin) {
//       io.to(admin.socketId).emit('updateUser', updatedUser);
//     }
//     if (updatedUser.isAdmin) {
//       io.to(updatedUser.socketId).emit('listUsers', users);
//     }
//   });
//
//   socket.on('onUserSelected', (user) => {
//     const admin = users.find((x) => x.isAdmin && x.online);
//     if (admin) {
//       const existUser = users.find((x) => x._id === user._id);
//       io.to(admin.socketId).emit('selectUser', existUser);
//     }
//   });
//
//   socket.on('onMessage', (message) => {
//     if (message.isAdmin) {
//       const user = users.find((x) => x._id === message._id && x.online);
//       if (user) {
//         io.to(user.socketId).emit('message', message);
//         user.messages.push(message);
//       }
//     } else {
//       const admin = users.find((x) => x.isAdmin && x.online);
//       if (admin) {
//         io.to(admin.socketId).emit('message', message);
//         const user = users.find((x) => x._id === message._id && x.online);
//         user.messages.push(message);
//       } else {
//         io.to(socket.id).emit('message', {
//           name: 'Admin',
//           body: 'Sorry. I am not online right now',
//         });
//       }
//     }
//   });
// });
//
// httpServer.listen(port, () => {
//   console.log(`Serve at http://localhost:${port}`);
// });
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server at ${process.env.SERVER}:${port}`);
});
