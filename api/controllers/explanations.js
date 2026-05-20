const Explanation = require('../models/Explanation')

const indexExplanation = async (req, res) => {
  try {
    const data = await Explanation.getAllExplanations()
    res.status(200).send({ data: data })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

module.exports = {indexExplanation};