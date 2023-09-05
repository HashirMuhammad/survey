const express = require('express');
const router = express.Router();
const Client = require('../models/Client'); // Import your Client model here
const Survey = require('../models/Survey'); // Import your Survey model here
const Question = require('../models/Questions'); // Import the Question model
const Answer = require('../models/Answer'); // Import your Answer model here


const auth = require('../middleware/fetchuser');

// GET client data by ID
router.get('/getclient/:surveyId', auth, async (req, res) => {
  try {
    const surveyId = req.params.surveyId;

    // Find the client in the database by ID
    const client = await Client.findOne({ survey_id : surveyId});

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // If the client is found, send the client data as a response
    res.status(200).json(client);
  } catch (error) {
    console.error('Error fetching client data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new client survey
router.post('/create/:surveyId', async (req, res) => {
  try {
    const surveyId = req.params.surveyId; // Extract surveyId from route parameters

    // Check if the email already exists in the database
    const existingClient = await Client.findOne({ email: req.body.email });

    if (existingClient) {
      // Email already exists, return an error response
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Email doesn't exist, proceed to create the client survey
    const clientData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      survey_id: surveyId, // Associate the client data with the specified survey
    };

    // Create the client survey
    const createdClientSurvey = await Client.create(clientData);

    res.status(201).json(createdClientSurvey);
  } catch (error) {
    console.error('Error creating client survey:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/surveys-and-data',auth, async (req, res) => {
  try {
    // Find all surveys in the database and get survey-user mappings
    const surveyMappings = await Client.find({}, { _id: 1, survey_id: 1 });

    // Initialize an object to store the final result
    const finalResult = {};

    // Iterate through survey mappings and fetch corresponding survey and client data
    for (const mapping of surveyMappings) {
      const surveyId = mapping.survey_id;

      // Fetch survey data for each survey ID
      const surveyRecord = await Survey.findOne({ _id: surveyId });
      if (surveyRecord) {
        // Extract survey name from the survey data
        const surveyName = surveyRecord.name;

        // Create an object combining client and survey data
        const resultItem = {
          _id: mapping._id,
          name: surveyName,
          survey_id: surveyId,
          user_id: surveyRecord.user_id, // If needed, you can include user_id as well
        };

        // Check if the survey ID exists as a key in the finalResult object
        if (!finalResult[surveyId]) {
          finalResult[surveyId] = [];
        }

        // Push the result item to the corresponding survey ID in the finalResult object
        finalResult[surveyId].push(resultItem);
      } else {
        console.warn(`Survey not found for ID: ${surveyId}`);
      }

      // Fetch client data for each client ID
      const clientRecord = await Client.findOne({ _id: mapping._id });
      if (clientRecord) {
        // Add client data if needed
        finalResult[surveyId].push(clientRecord);
      } else {
        console.warn(`Client not found for ID: ${mapping._id}`);
      }
    }

    // Create a response object with the final result
    const responseData = {
      finalResult,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:surveyId', auth, async (req, res) => {
  try {
    const surveyId = req.params.surveyId;

    // Find questions associated with the specified survey ID
    const questions = await Question.find({ survey_id: surveyId });

    // Fetch answers for each question
    const questionsWithAnswers = await Promise.all(questions.map(async (question) => {
      const answers = await Answer.find({ question_id: question._id });
      
      // Fetch the related question for each answer
      const questionForAnswers = await Question.findOne({ _id: question._id });

      return { question: questionForAnswers.toObject(), answers };
    }));

    res.status(200).json(questionsWithAnswers);
  } catch (error) {
    res.status(500).json(error);
  }
});





module.exports = router;
