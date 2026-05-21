// Imports Explantion model being tested
const Explanation = require('../../../models/Explanation')
// Imports Scenario model being tested
const Scenario = require('../../../models/Scenario')
// Import User model being tested
const User = require('../../../models/User')
// Imports database connection module
const db = require('../../../database/connect')

// Main test suite for Explanation model ---------------------------------------
xdescribe('Explanation', () => {

  // Runs before each test
  // Clears mock call history between tests
  beforeEach(() => jest.clearAllMocks())
  // Runs once after all tests finish
  // Resets mocked implementations
  afterAll(() => jest.resetAllMocks())


  // Test suite for Explanation.getAllExplanations() ---------------------------------------
  describe ('getAllExplanations', () => {

    // Tests successful retrieval of explanations
    it('resolves with explanations on successful db query', async () => {

      // ARRANGE --------------------------------------------------------
      // Fake database rows used for testing
      const mockExplanations = [
        { question_id: 1, answer: 'Fred', category: 1 , initial_setting: 'hello', explanation: 'yo'},
        { question_id: 2, answer: 'George', category: 1 , initial_setting: 'hello', explanation: 'yo'},
        { question_id: 3, answer: 'Ron', category: 1 , initial_setting: 'hello', explanation: 'yo'},

      ];
      // Mocks db.query() to return fake rows once
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: mockExplanations });

      // ACT ------------------------------------------------------------
      // Runs Explanation.getAllExplanations()
      const explanations = await Explanation.getAllExplanations();

      // ASSERT --------------------------------------------------------
      // Checks 3 explanations were returned
      expect(explanations).toHaveLength(3);
      // Checks first explanation contains question_id
      expect(explanations[0]).toHaveProperty('question_id');
      // Checks first explanation answer
      expect(explanations[0].answer).toBe('Fred');
      // Checks correct SQL query was used
      expect(db.query).toHaveBeenCalledWith('SELECT q.question_id, q.answer, s.category, s.initial_setting, q.explanation FROM questions q LEFT JOIN scenarios s ON (q.scenario_id = s.scenario_id)');
    });


    // Tests error when no explanations are found
    xit('should throw an Error when no explanations are found', async () => {

      // ARRANGE --------------------------------------------------------
      // Mocks empty database response
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

      // ACT & ASSERT ---------------------------------------------------
      // Expects Explanation.getAllExplanations() to throw error
      await expect(Explanation.getAllExplanations()).rejects.toThrow('No explanation available.');
    });
  })
  
})



// Main test suite for Scenario model ---------------------------------------
xdescribe('Scenario', () => {

  // Runs before each test
  // Clears mock call history between tests
  beforeEach(() => jest.clearAllMocks())
  // Runs once after all tests finish
  // Resets mocked implementations
  afterAll(() => jest.resetAllMocks())


  // Test suite for Scenario.getScenario() ---------------------------------------
  describe ('getScenario', () => {

    // Tests successful retrieval of scenario
    it('resolves with scenario on successful db query', async () => {

      // ARRANGE --------------------------------------------------------
      // Fake database rows used for testing
      const mockScenario = [
        { question_id: 1, question: 'Who are you?', answer: 'Im me', correct_response: "Cool", incorrect_response: "Noooo", option_1: "im me", option_2: "im you"},
        { question_id: 2, question: 'What are you?', answer: 'Im me', correct_response: "Cool", incorrect_response: "Noooo", option_1: "im me", option_2: "im you"},
        { question_id: 3, question: 'Why are you?', answer: 'Im me', correct_response: "Cool", incorrect_response: "Noooo", option_1: "im me", option_2: "im you"}
      ];
      // Mocks db.query() to return fake rows once
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: mockScenario });

      // ACT ------------------------------------------------------------
      // Runs Goat.getAll()
      const scenario = await Scenario.getScenario();

      // ASSERT --------------------------------------------------------
      // Checks 3 questions were returned
      expect(scenario).toHaveLength(3);
      // Checks first question contains question_id
      expect(scenario[0]).toHaveProperty('question_id');
      // Checks first question name
      expect(scenario[0].question).toBe('Who are you?');
      // Checks correct SQL query was used
      expect(db.query).toHaveBeenCalledWith("SELECT q.question, q.answer, q.correct_response, q.incorrect_response, o.option_1, o.option_2 FROM questions q LEFT JOIN options o ON (q.question_id = o.question_id);");
    });


    // Tests error when no goats are found
    it('should throw an Error when no scenario is found', async () => {

      // ARRANGE --------------------------------------------------------
      // Mocks empty database response
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

      // ACT & ASSERT ---------------------------------------------------
      // Expects Scenario.getScenario() to throw error
      await expect(Scenario.getScenario()).rejects.toThrow('No scenarios available.');
    });
  })
  
})

// Test suite for Goat.create() ---------------------------------------------
describe('create', () => {

    // Tests successful goat creation
    it('resolves with user  on successful creation', async () => {

      // ARRANGE ----------------------------------------------------------------
      // Fake goat data
      const userData = { user_id: 1, username: 'testName', password: 'testPassword', isAdmin: true  };
      // Mocks inserted database row
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [userData] });

      // ACT ---------------------------------------------------------------------
      // Runs Goat.create()
      const result = await User.create(userData);

      // ASSERT ------------------------------------------------------------------
      // Checks returned object is Goat instance
      expect(result).toBeInstanceOf(User);
      // Checks returned values
      expect(result).toHaveProperty('id', 1);
      expect(result).toHaveProperty('username', 'testName');
      expect(result).toHaveProperty('password', 'testPassword');
      // Checks correct INSERT query and parameters
      expect(db.query).toHaveBeenCalledWith("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;",
            [userData.username, userData.password])
    });


    // Tests validation error when password missing
    it('should throw an Error when password is missing', async () => {

      // ARRANGE ------------------------------------------------------------------------
      // Missing age field
      const incompleteUserData = { username: 'testName' };

      // ACT & ASSERT --------------------------------------------------------------------
      // Expects Goat.create() to throw validation error
      await expect(User.create(incompleteUserData)).rejects.toThrow('password is missing');
    });

    it('should throw an Error when username is missing', async () => {

      // ARRANGE ------------------------------------------------------------------------
      // Missing age field
      const incompleteUserData = { password: 'testPassword' };

      // ACT & ASSERT --------------------------------------------------------------------
      // Expects Goat.create() to throw validation error
      await expect(User.create(incompleteUserData)).rejects.toThrow('username is missing');
    });


  })