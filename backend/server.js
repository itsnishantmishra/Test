const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mernapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model('User', new mongoose.Schema({
  email: String,
  password: String,
}));

const Agent = mongoose.model('Agent', new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  password: String,
}));

const Task = mongoose.model('Task', new mongoose.Schema({
  agentId: mongoose.Schema.Types.ObjectId,
  firstName: String,
  phone: String,
  notes: String,
}));

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  res.json({ message: 'User registered successfully' });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
  res.json({ token });
});

app.post('/add-agent', async (req, res) => {
  const { name, email, mobile, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const agent = new Agent({ name, email, mobile, password: hashedPassword });
  await agent.save();
  res.json({ message: 'Agent added successfully' });
});

const upload = multer({ dest: 'uploads/' });

app.post('/upload-csv', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file || !['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(file.mimetype)) {
    return res.status(400).json({ message: 'Invalid file type' });
  }

  const agents = await Agent.find();
  if (agents.length < 5) return res.status(400).json({ message: 'Minimum 5 agents required' });

  const results = [];
  fs.createReadStream(file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      const tasksPerAgent = Math.floor(results.length / 5);
      let remaining = results.length % 5;

      let idx = 0;
      for (let i = 0; i < 5; i++) {
        const count = tasksPerAgent + (remaining-- > 0 ? 1 : 0);
        const agentTasks = results.slice(idx, idx + count);
        idx += count;

        const taskDocs = agentTasks.map(task => ({
          agentId: agents[i]._id,
          firstName: task.FirstName,
          phone: task.Phone,
          notes: task.Notes
        }));
        await Task.insertMany(taskDocs);
      }
      res.json({ message: 'Tasks distributed successfully' });
    });
});

app.get('/agents-tasks', async (req, res) => {
  const agents = await Agent.find();
  const data = await Promise.all(agents.map(async agent => {
    const tasks = await Task.find({ agentId: agent._id });
    return { agent, tasks };
  }));
  res.json(data);
});

app.listen(5000, () => console.log('Server started on port 5000'));
