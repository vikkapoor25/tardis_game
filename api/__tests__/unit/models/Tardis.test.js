// Imports Goat model being tested
const Goat = require('../../../models/Goat')
// Imports database connection module
const db = require('../../../database/connect')

// Main test suite for Goat model ---------------------------------------
describe('Goat', () => {

  // Runs before each test
  // Clears mock call history between tests
  beforeEach(() => jest.clearAllMocks())
  // Runs once after all tests finish
  // Resets mocked implementations
  afterAll(() => jest.resetAllMocks())


  // Test suite for Goat.getAll() ---------------------------------------
  describe ('getAll', () => {

    // Tests successful retrieval of goats
    it('resolves with goats on successful db query', async () => {

      // ARRANGE --------------------------------------------------------
      // Fake database rows used for testing
      const mockGoats = [
        { id: 1, name: 'g1', age: 1 },
        { id: 2, name: 'g2', age: 2 },
        { id: 3, name: 'g3', age: 3 },
      ];
      // Mocks db.query() to return fake rows once
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: mockGoats });

      // ACT ------------------------------------------------------------
      // Runs Goat.getAll()
      const goats = await Goat.getAll();

      // ASSERT --------------------------------------------------------
      // Checks 3 goats were returned
      expect(goats).toHaveLength(3);
      // Checks first goat contains id property
      expect(goats[0]).toHaveProperty('id');
      // Checks first goat name
      expect(goats[0].name).toBe('g1');
      // Checks correct SQL query was used
      expect(db.query).toHaveBeenCalledWith("SELECT * FROM goats");
    });


    // Tests error when no goats are found
    it('should throw an Error when no goats are found', async () => {

      // ARRANGE --------------------------------------------------------
      // Mocks empty database response
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

      // ACT & ASSERT ---------------------------------------------------
      // Expects Goat.getAll() to throw error
      await expect(Goat.getAll()).rejects.toThrow('No goats available.');
    });
  })


  // Test suite for Goat.findById() ---------------------------------------
  describe ('findById', () => {

    // Tests successful goat lookup
    it('resolves with goat on successful db query', async () => {

      // ARRANGE -----------------------------------------------------------
      // Fake goat row
      const testGoat = { id: 1, name: 'goat', age: 22 };
      // Mocks database response
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [testGoat] });

      // ACT ----------------------------------------------------------------
      // Runs Goat.findById()
      const result = await Goat.findById(1);

      // ASSERT -------------------------------------------------------------
      // Checks returned object is Goat instance
      expect(result).toBeInstanceOf(Goat);
      // Checks goat values
      expect(result.name).toBe('goat');
      expect(result.id).toBe(1);
      // Checks correct SQL query and parameter
      expect(db.query).toHaveBeenCalledWith('SELECT * FROM goats WHERE id = $1', [1]);    
    });


    // Tests error when goat is missing
    it('should throw an Error when goat is not found', async () => {

      // ARRANGE -------------------------------------------------------------
      // Mocks empty database response
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

      // ACT & ASSERT ---------------------------------------------------------
      // Expects Goat.findById() to throw error
      await expect(Goat.findById(999)).rejects.toThrow('This goat does not exist!');
    });
  })


  // Test suite for Goat.create() ---------------------------------------------
  describe('create', () => {

    // Tests successful goat creation
    it('resolves with goat on successful creation', async () => {

      // ARRANGE ----------------------------------------------------------------
      // Fake goat data
      const goatData = { name: 'plum', age: 99 };
      // Mocks inserted database row
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ ...goatData, id: 1 }] });

      // ACT ---------------------------------------------------------------------
      // Runs Goat.create()
      const result = await Goat.create(goatData);

      // ASSERT ------------------------------------------------------------------
      // Checks returned object is Goat instance
      expect(result).toBeInstanceOf(Goat);
      // Checks returned values
      expect(result).toHaveProperty('id', 1);
      expect(result).toHaveProperty('name', 'plum');
      expect(result).toHaveProperty('age', 99);
      // Checks correct INSERT query and parameters
      expect(db.query).toHaveBeenCalledWith("INSERT INTO goats(name, age) VALUES ($1, $2) RETURNING *", [goatData.name, goatData.age]);
    });


    // Tests validation error when age missing
    it('should throw an Error when age is missing', async () => {

      // ARRANGE ------------------------------------------------------------------------
      // Missing age field
      const incompleteGoatData = { name: 'plum' };

      // ACT & ASSERT --------------------------------------------------------------------
      // Expects Goat.create() to throw validation error
      await expect(Goat.create(incompleteGoatData)).rejects.toThrow('age is missing');
    });
  })

  
  // Test suite for Goat.update() --------------------------------------------------------- 
  describe('update', () => {

    // Tests successful goat update
    it('should return the updated goat on successful update', async () => {

      // ARRANGE ---------------------------------------------------------------------------
      // Existing Goat instance
      const goat = new Goat({ id: 72, name: 'plum', age: 99 });
      // New update data
      const updatedData = { name: 'pear', age: 100 };
      // Expected updated row
      const updatedGoat = { id: 72, ...updatedData };
      // Mocks updated database response
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [updatedGoat] });

      // ACT -------------------------------------------------------------------------------
      // Runs goat.update()
      const result = await goat.update(updatedData);

      // ASSERT ----------------------------------------------------------------------------
      // Checks returned object is Goat instance
      expect(result).toBeInstanceOf(Goat);
      // Checks updated values
      expect(result.id).toBe(72);
      expect(result.name).toBe('pear');
      expect(result.age).toBe(100);
      // Checks correct UPDATE query and parameters
      expect(db.query).toHaveBeenCalledWith("UPDATE goats SET name = $1, age = $2 WHERE id = $3 RETURNING * ",[updatedData.name, updatedData.age, goat.id]);
    });


    // Tests validation error when fields missing
    it('should throw an Error when age or name is missing', async () => {

      // ARRANGE -----------------------------------------------------------------------------
      // Existing Goat instance
      const goat = new Goat({ id: 1, name: 'plum', age: 99 });
      // Missing age field
      const incompleteData = { name: 'puppet' };

      // ACT & ASSERT --------------------------------------------------------------------------
      // Expects goat.update() to throw validation error
      await expect(goat.update(incompleteData)).rejects.toThrow('age or name missing');
    });


    // Tests database failure during update
    it('should throw an Error on db query failure', async () => {

      // ARRANGE -------------------------------------------------------------------------------
      // Existing Goat instance
      const goat = new Goat({ id: 72, name: 'plum', age: 99 });
      // Mocks database failure
      jest.spyOn(db, 'query').mockRejectedValue(new Error('Database error'));

      // ACT & ASSERT --------------------------------------------------------------------------
      // Expects update() to throw database error
      await expect(goat.update({ name: 'pear', age: 100 })).rejects.toThrow('Database error');
    });
  })


  // Test suite for Goat.destroy() -------------------------------------------------------------
  describe ('destroy', () => {

    // Tests successful goat deletion
    it('should return the deleted goat on successful deletion', async () => {

      // ARRANGE -------------------------------------------------------------------------------
      // Existing Goat instance
      const goat = new Goat({ id: 72, name: 'plum', age: 72 });
      // Mocks deleted database row
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ id: 72, name: 'plum', age: 72 }] });

      // ACT -----------------------------------------------------------------------------------
      // Runs goat.destroy()
      const result = await goat.destroy();

      // ASSERT --------------------------------------------------------------------------------
      // Checks returned object is Goat instance
      expect(result).toBeInstanceOf(Goat);
      // Checks deleted goat values
      expect(result.id).toBe(72);
      expect(result.name).toBe('plum');
      expect(result.age).toBe(72);
      // Checks correct DELETE query and parameter
      expect(db.query).toHaveBeenCalledWith("DELETE FROM goats WHERE id = $1 RETURNING *", [goat.id]);
    });

    
    // Tests database failure during deletion
    it('should throw an Error on db query failure', async () => {

      // ARRANGE ---------------------------------------------------------------------------------
      // Existing Goat instance
      const goat = new Goat({ id: 72, name: 'plum', age: 72 });
      // Mocks database failure
      jest.spyOn(db, 'query').mockRejectedValue(new Error('Database error'));

      // ACT & ASSERT -----------------------------------------------------------------------------
      // Expects destroy() to throw error
      await expect(goat.destroy()).rejects.toThrow('Cannot delete.');
    });
  })
})