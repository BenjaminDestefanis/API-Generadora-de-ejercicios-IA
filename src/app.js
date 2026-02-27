const express = require('express');
const cors = require('cors');


const app = express();
const testRoutes = require('./routes/testRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

//console.log(typeof authRoutes, typeof testRoutes)

app.use(cors());
app.use(express.json());
app.use('/api', testRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

module.exports = app;