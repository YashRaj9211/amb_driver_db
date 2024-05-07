const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIo = require('socket.io');


const driverRouter = require('./routes/driver.router.js');
const userRouter = require('./routes/user.router.js');
const tripRouter = require('./routes/trip.router.js');
const ambulanceRouter = require('./routes/ambulance.router.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Use cors middleware
app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1/ambulance")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["*"],
    credentials: true
  }
});
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  // Listen for coordinate data from the frontend user
  socket.on('coordinates', (coordinates) => {
    console.log('Received coordinates from user:', coordinates);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});


app.get('/', (req, res) => {
  return res.json({ 'message': 'Hello, world!' });
});

app.use('/api/driver', driverRouter);
app.use('/api/user', userRouter);
app.use('/api/trip', tripRouter);
app.use('/api/ambulance', ambulanceRouter);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
