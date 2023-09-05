const express = require('express');
const router = express.Router();
const auth = require('../middleware/fetchuser');
const Question = require('../models/Questions'); // Import the Question model


// Create a new 
router.post('/create/:surveyId', auth, async (req, res) => {
  try {
    // const surveyId = req.query.surveyId; // Extract surveyId from query parameters
    const questionData = {
      type: req.body.type,
      question: req.body.question,
      options: req.body.options,
      survey_id: req.body.survey_Id, // Associate the question with the specified survey

    };
    const createdQuestion = await Question.create(questionData);
    res.status(201).json(createdQuestion);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(400).json(error);
  }
});

router.get('/:surveyId', auth, async (req, res) => {
  try {
    const surveyId = req.params.surveyId;

    // Find questions associated with the specified survey ID
    const questions = await Question.find({ survey_id: surveyId });

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:questionId', auth, async (req, res) => {
  try {
    // const user = req.user;z
    const questionId = req.params.questionId;

    // Check if the question exists and belongs to the authenticated user
    const questionToDelete = await Question.findOne({ _id: questionId });

    if (!questionToDelete) {
      return res.status(404).json({ message: 'Question not found or does not belong to the user.' });
    }

    // Delete the question
    await Question.findByIdAndRemove(questionId);

    res.status(204).send(); // Respond with a 204 No Content status on successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;







// const express = require('express');
// const router = express.Router();
// const Question = require('../models/Questions');

// // Create a question
// router.post('/', async (req, res) => {
//   try {
//     const questions = req.body;
//     const savedQuestions = await Question.insertMany(questions);
//     res.status(201).json(savedQuestions);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });

// // Get all questions
// router.get('/', async (req, res) => {
//   try {
//     const questions = await Question.find();
//     res.status(200).json(questions);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// module.exports = router;
