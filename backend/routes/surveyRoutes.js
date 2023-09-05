const express = require('express');
const router = express.Router();
const auth = require('../middleware/fetchuser');
const Survey = require('../models/Survey');
const Question = require('../models/Questions');

// Create a new survey
router.post('/create', auth, async (req, res) => {
  try {
    const surveyData = {
      name: req.body.name,
      user_id: req.user.id,
      questions: [] // Initially, no questions are added
    };
    const createdSurvey = await Survey.create(surveyData);
    res.status(201).json(createdSurvey);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/:surveyId/addquestion', auth, async (req, res) => {
    try {
      const user = req.user;
      const surveyId = req.params.surveyId;
      const questionIds = req.body.questionIds; // An array of question IDs
  
      // Update the survey's questions array with the new question IDs
      const updatedSurvey = await Survey.findByIdAndUpdate(
        surveyId,
        { $addToSet: { questions: questionIds } }, // Use $addToSet to avoid duplicates
        { new: true }
      );
  
      res.status(200).json(updatedSurvey);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // Get surveys for the authenticated user
router.get('/user', auth, async (req, res) => {
  try {
    const userId = req.user.id; // Retrieve user ID from req.user
    const surveys = await Survey.find({ user_id: userId });
    res.status(200).json(surveys);
  } catch (error) {
    res.status(500).json(error);
  }
});
  

// Delete a survey by ID
router.delete('/:surveyId', auth, async (req, res) => {
  try {
    const user = req.user;
    const surveyId = req.params.surveyId;

    // Check if the survey exists and belongs to the authenticated user
    const surveyToDelete = await Survey.findOne({ _id: surveyId, user_id: user.id });

    if (!surveyToDelete) {
      return res.status(404).json({ message: 'Survey not found or does not belong to the user.' });
    }

    // Delete the survey
    await Survey.findByIdAndRemove(surveyId);

    res.status(204).send(); // Respond with a 204 No Content status on successful deletion
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/public/:surveyId', async (req, res) => {
  try {
    const surveyId = req.params.surveyId;
    console.log(surveyId);
    // Find questions associated with the specified survey ID
    const questions = await Question.find({ survey_id: surveyId });
    console.log(questions);


    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json(error);
  }
});



module.exports = router;
