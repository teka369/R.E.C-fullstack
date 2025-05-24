const express = require('express');
const cors = require('cors');
const db = require('./database/db');
const apiRoutes = require('./routes/index');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.use('/api', apiRoutes);


