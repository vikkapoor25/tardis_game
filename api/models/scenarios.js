//models/Goat.js
const db = require('../database/connect')

class Scenario {

constructor({ scenario_id, name, initial_setting }) {
    this.scenario_id = scenario_id;
    this.name = name;
    this.initial_setting = initial_setting;
}

static async getAll() {
    const response = await db.query("SELECT * FROM scenarios ORDER BY name;");

    if (response.rows.length === 0) {
      throw new Error("No scenarios available.")
    }

    return response.rows.map(s => new Snack(s));
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM scenarios WHERE scenario_id = $1;", [id]);

    if (response.rows.length != 1) {
      throw new Error("Scenario Not Found.")
    }

    return new Scenario(response.rows[0]);
  }

  static async getQuestions(id) {
    const response = await db.query("SELECT * FROM questions WHERE scenario_id = $1;", [id]);

    if (response.rows.length != 1) {
      throw new Error("Scenario Not Found.")
    }

    return new Scenario(response.rows[0]);
  }

}

  

  /* static async create(data) {
    const { name, description, healthy = false, vegetarian = false } = data;
    const response = await db.query('INSERT INTO snacks (name, description, healthy, vegetarian) VALUES ($1, $2, $3, $4) RETURNING *;',
      [name, description, healthy, vegetarian]
    );
    const snackId = response.rows[0].id;
    const newSnack = await Snack.getOneById(snackId);
    return newSnack;
  }

  async update(data) {
    const response = await db.query("PATCH snacks SET votes = $1 RETURNING id, votes;",
      [this.votes + parseInt(data.votes), this.id]);

    if (response.rows.length != 1) {
      throw new Error("Unable to update votes.")
    }

    return new Snack(response.rows[0]);
  }

  async destroy() {
    const response = await db.query('DELETE FROM snacks WHERE id = $1 RETURNING *;', [this.id]);

    if (response.rows.length != 1) {
      throw new Error("Unable to delete snack.")
    }

    return new Snack(response.rows[0]);
  }
}  

module.exports = Snack; */

  /* static async getAll() {
    const response = await db.query("SELECT * FROM goats");
    if (response.rows.length === 0) {
      throw new Error("No goats available.")
    }
    return response.rows.map(g => new Goat(g));
  }

  static async findById(id) {
    try {
      const goatData = await db.query('SELECT * FROM goats WHERE id = $1', [id])
      const goat = new Goat(goatData.rows[0]);
      return goat;
    } catch (err) {
      throw new Error('This goat does not exist!');
    }
  }

  static async create(data) {
    if (!data.name) { throw new Error("Name is missing") }

    if (!data.age) {
      throw new Error("age is missing")
    }

    if (!data.name || !data.age) {
      throw new Error("age or name missing")
    }

    const response = await db.query("INSERT INTO goats(name, age) VALUES ($1, $2) RETURNING *", [data.name, data.age])
    return new Goat(response.rows[0])
  }

  async update(data) {
    if (!data.name || !data.age) {
      throw new Error("age or name missing")
    }

    try {
      const response = await db.query(" UPDATE goats SET name = $1, age = $2 WHERE id = $3 RETURNING * ", [data.name, data.age, this.id])
      return new Goat(response.rows[0])
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async destroy() {
    try {
      const response = await db.query("DELETE FROM goats WHERE id = $1 RETURNING *", [this.id])
      return new Goat(response.rows[0])
    } catch(err) {
      throw new Error("Cannot delete.")
    }
  }
}

module.exports = Goat */