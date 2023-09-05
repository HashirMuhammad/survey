const express = require('express');
const cors = require('cors');
const connectDatabase = require('../backend/config/database');
const questionRoutes = require('../backend/routes/questionRoutes');
const userRoutes = require('../backend/routes/userRoutes');
const surveyRoutes = require('../backend/routes/surveyRoutes');
const clientRoutes = require('../backend/routes/clientRoutes');
const answerRoutes = require('../backend/routes/answerRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDatabase();

// Use question routes
app.use('/api/questions', questionRoutes);
app.use('/api/auth/', userRoutes);
app.use('/api/surveys', surveyRoutes); // Mount surveyRoutes at /api/surveys
app.use('/api/clientsurvey', clientRoutes); // Mount surveyRoutes at /api/surveys
app.use('/api/answer', answerRoutes); // Mount surveyRoutes at /api/surveys


// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});






// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const app = express();
// const port = process.env.PORT || 3000;
// // const mongoURI = 'mongodb://localhost:27017/survey'; // Replace with your MongoDB URI
// const mongoURI = 'mongodb://127.0.0.1:27017/survey'; // Use IPv4 address


// const QuestionSchema = new mongoose.Schema({
//   type: String,
//   question: String,
//   options: [String]
// });

// const Question = mongoose.model('Question', QuestionSchema);

// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => {
//     console.log("Connected to MongoDB successfully!");

//     // Start the Express server after successfully connecting to MongoDB
//     app.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//     });
//   })
//   .catch(error => {
//     console.error("Error connecting to MongoDB:", error);
//   });

// // Create a question
// app.post('/api/questions', async (req, res) => {
//   try {
//     const questions = req.body;
//     const savedQuestions = await Question.insertMany(questions);
//     res.status(201).json(savedQuestions);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });


// // Get all questions
// app.get('/api/questions', async (req, res) => {
//   try {
//     const questions = await Question.find();
//     res.status(200).json(questions);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

