const db = require('../database/connect')

class Explanation {
	constructor({ question_id, answer, category, initial_setting, explanation }) {
        this.question_id = question_id;
        this.answer = answer;
        this.category = category;
        this.initial_setting = initial_setting;
        this.explanation = explanation;
  }
  
  static async getAllExplanations() {
    const response = await db.query('SELECT q.question_id, q.answer, s.category, s.initial_setting, q.explanation FROM questions q LEFT JOIN scenarios s ON (q.scenario_id = s.scenario_id)')
    if (response.rows.length === 0) {
      throw new Error("No explanation available.")
    }
    return response.rows.map(s => new Explanation(s));
  }

  static async getExplanationById(id) {
    const response = await db.query("select q.question_id, q.answer, s.category, q.explanation FROM questions q LEFT JOIN scenarios s ON (q.scenario_id = s.scenario_id) WHERE q.question_id = $3;", [question_id]);
    if (response.rows.length != 1) {
        throw new Error("Scenario Not Found.")
    }
    return new Explanation(response.rows[0]);
  }
}

module.exports = Explanation



