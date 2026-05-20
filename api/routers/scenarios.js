const { Router } = require('express');

const scenarioController = require('../controllers/scenarios');
const explanationController = require('../controllers/explanations');
const authenticator = require('../middleware/authenticator')

const scenarioRouter = Router();
const explanationRouter = Router();


scenarioRouter.get('/',authenticator,scenarioController.indexScenario);
explanationRouter.get('/', explanationController.indexExplanation);

module.exports = {
    scenarioRouter, 
    explanationRouter};