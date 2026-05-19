//models/Goat.js
const db = require('../database/connect')

class Scenario {
	constructor({ question_id, question, answer, correct_response, incorrect_response, option_1, option_2 }) {
	this.question_id = question_id;
	this.question = question;
	this.answer = answer;
	this.correct_response = correct_response;
	this.incorrect_response = incorrect_response;
	this.option_1 = option_1;
	this.option_2 = option_2;


  static async getScenario() {
    const response = await db.query("SELECT q.question, q.answer, q.correct_response, q.incorrect_response, o.option_1, o.option_2 FROM questions q LEFT JOIN options o ON (q.question_id = o.question_id);");

    if (response.rows.length === 0) {
      throw new Error("No scenarios available.")
    }

    return response.rows.map(s => new Scenario(s));
  }

  static async getQuestion(id) {
    const response = await db.query("SELECT q.question, q.answer, q.correct_response, q.incorrect_response, o.option_1, o.option_2 FROM questions q LEFT JOIN options o ON (q.question_id = o.question_id) WHERE q.question_id = $1", [question_id]);

    if (response.rows.length != 1) {
      throw new Error("Scenario Not Found.")
    }

    return new Scenario(response.rows[0]);
  }
}
}


class Explanation {
	constructor({ question_id, answer, category, explanation }) {
	this.question_id = question_id;
	this.answer = answer;
	this.category = category;
	this.explanation = explanation;
  }

   static async getAllExplanations() {
    const response = await db.query('SELECT q.question_id, q.answer, s.category, q.explaination FROM questions q LEFT JOIN scenarios s ON (q.scenario_id = s.scenario_id)')

    if (response.rows.length === 0) {
      throw new Error("No explanation available.")
    }

    return response.rows.map(s => new Scenario(s));
  }

  static async getExplanationById(id) {
    const response = await db.query("select q.question_id, q.answer, s.category, q.explaination FROM questions q LEFT JOIN scenarios s ON (q.scenario_id = s.scenario_id) WHERE q.question_id = $3;", [question_id]);

    if (response.rows.length != 1) {
      throw new Error("Scenario Not Found.")
    }

    return new Scenario(response.rows[0]);
  }


}




static async getScenario() {
    const response = await db.query("SELECT q.question, q.answer, q.correct_response, q.incorrect_response, o.option_1, o.option_2 FROM questions q LEFT JOIN options o ON (q.question_id = o.question_id);");

    if (response.rows.length === 0) {
      throw new Error("No scenarios available.")
    }

    return response.rows.map(s => new Scenario(s));
  }

  static async getQuestion(id) {
    const response = await db.query("SELECT q.question, q.answer, q.correct_response, q.incorrect_response, o.option_1, o.option_2 FROM questions q LEFT JOIN options o ON (q.question_id = o.question_id) WHERE q.question_id = $1", [question_id]);

    if (response.rows.length != 1) {
      throw new Error("Scenario Not Found.")
    }

    return new Scenario(response.rows[0]);
  }

  /*static async getAllExplanations() {
    const response = await db.query('SELECT q.question_id, q.answer, s.category, q.explaination FROM questions q LEFT JOIN scenarios s ON (q.scenario_id = s.scenario_id)')

    if (response.rows.length === 0) {
      throw new Error("No explanation available.")
    }

    return response.rows.map(s => new Scenario(s));
  }

  static async getExplanationById(id) {
    const response = await db.query("select q.question_id, q.answer, s.category, q.explaination FROM questions q LEFT JOIN scenarios s ON (q.scenario_id = s.scenario_id) WHERE q.question_id = $3;", [question_id]);

    if (response.rows.length != 1) {
      throw new Error("Scenario Not Found.")
    }

    return new Scenario(response.rows[0]);
  } +/



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