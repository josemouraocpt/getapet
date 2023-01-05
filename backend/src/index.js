const express = require('express');
const cors = require('cors');
const userRoutes = require('../routes/UserRoutes');
const petRoutes = require('../routes/PetRoutes');

const app = express();

app.use(express.json());

app.use(cors({
	credentials: true,
	origin: 'http://localhost:5173'
}));

app.use(express.static('public'));

app.use('/users', userRoutes);
app.use('/pets', petRoutes);

app.listen(5000, () => {
	console.log('Server is running!');
});