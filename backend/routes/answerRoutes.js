const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer'); // Import your Answer model here

// Create a new answer
router.post('/create/:surveyId', async (req, res) => {
    try {
      const surveyId = req.params.surveyId; // Extract surveyId from route parameters
      const answers = req.body; // Extract the array of answers from the request body
  
      // Create an array to store the created answers
      const createdAnswers = [];
  
      // Loop through the array of answers and create each one
      for (const answerData of answers) {
        const { answer, question_id, user_id } = answerData;
  
        const answerObject = {
          answer,
          question_id,
          survey_id: surveyId,
          client_id: user_id // Assuming user_id corresponds to client_id
        };
  
        // Create a new answer using the Answer model
        const createdAnswer = await Answer.create(answerObject);
  
        // Push the created answer to the array
        createdAnswers.push(createdAnswer);
      }
  
      res.status(201).json(createdAnswers);
    } catch (error) {
      console.error('Error creating answers:', error);
      res.status(400).json(error);
    }
  });
  

module.exports = router;
