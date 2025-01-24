const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/github-actions-demo';

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const MessageSchema = new mongoose.Schema({ text: String });
const Message = mongoose.model('Message', MessageSchema);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World! Deployed using GitHub Actions with MongoDB 🚀');
});

app.post('/message', async (req, res) => {
  const message = new Message({ text: req.body.text });
  await message.save();
  res.status(201).send({ message: 'Message saved!', data: message });
});

app.get('/messages', async (req, res) => {
  const messages = await Message.find();
  res.status(200).send(messages);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
