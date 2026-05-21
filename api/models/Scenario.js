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
}

module.exports = Scenario