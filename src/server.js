
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const errorHandler = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);


app.get('/', (req, res) => {
  res.send('CulinaryCanvas API is running...');
});

app.use(errorHandler);
// ...
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
