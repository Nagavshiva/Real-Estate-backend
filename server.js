const express = require('express');
const cors = require('cors')
const connectedDb = require("./config/db")
// routes
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');


const app = express();
app.use(express.json());
app.use(cors())

// Db Connection
connectedDb()

// routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
