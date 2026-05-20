const explanationsController = require('../../../controllers/explanations')
const scenarioController = require('../../../controllers/scenarios')
const Explanation = require('../../../models/Explanation')
const Scenario = require('../../../models/Scenario')

// Mocking response methods
const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(() => ({ 
  send: mockSend, 
  json: mockJson, 
  end: mockEnd 
}));

const mockRes = { status: mockStatus };

xdescribe('Scenario & Explaination Controller', () => {
  beforeEach(() => jest.clearAllMocks())

  afterAll(() => jest.resetAllMocks())

  describe('indexScenario', () => {
    it('should return scenario with a status code 200', async () => {
      const testScenario = ['q1', 'q2']
      jest.spyOn(Scenario, 'getScenario').mockResolvedValue(testScenario)

      await scenarioController.indexScenario(null, mockRes)
      
      expect(Scenario.getScenario).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockSend).toHaveBeenCalledWith({ data: testScenario })
    })

    it('should return an error upon failure', async () => {
      jest.spyOn(Scenario, 'getScenario').mockRejectedValue(new Error('Something happened to your db'))

      await scenarioController.indexScenario(null, mockRes)
      
      expect(Scenario.getScenario).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(500)
      expect(mockSend).toHaveBeenCalledWith({ error: 'Something happened to your db' })
    })
  })

    describe('indexExplanation', () => {
    it('should return explanation with a status code 200', async () => {
      const testExplanations = ['e1', 'e2']
      jest.spyOn(Explanation, 'getAllExplanations').mockResolvedValue(testExplanations)

      await explanationsController.indexExplanation(null, mockRes)
      
      expect(Explanation.getAllExplanations).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockSend).toHaveBeenCalledWith({ data: testExplanations })
    })

    it('should return an error upon failure', async () => {
      jest.spyOn(Explanation, 'getAllExplanations').mockRejectedValue(new Error('Something happened to your db'))

      await explanationsController.indexExplanation(null, mockRes)
      
      expect(Explanation.getAllExplanations).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(500)
      expect(mockSend).toHaveBeenCalledWith({ error: 'Something happened to your db' })
    })
  })

})




