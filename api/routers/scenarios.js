const { Router } = require('express');

const scenarioController = require('../controllers/scenarios');

const scenarioRouter = Router();

scenarioRouter.get('/', scenarioController.index);
scenarioRouter.get('/:id', scenarioController.show);
scenarioRouter.get('/:id/questions', scenarioController.questions);

module.exports = scenarioRouter;