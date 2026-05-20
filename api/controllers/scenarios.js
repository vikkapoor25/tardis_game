const Scenario = require('../models/Scenario')

const indexScenario = async (req, res) => {
  try {
    const data = await Scenario.getScenario()
    res.status(200).send({ data: data })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

module.exports = {
    indexScenario
};

// const showQuestion = async (req, res) => {
//   try {
//     const goatId = parseInt(req.params.id)
//     const selectedGoat = await Goat.findById(goatId)
//     res.status(200).send({ data: selectedGoat })
//   } catch (error) {
//     res.status(404).send({ error: error.message })
//   }
// }

// const showExplanation = async (req, res) => {
//   try {
//     const goatId = parseInt(req.params.id)
//     const selectedGoat = await Goat.findById(goatId)
//     res.status(200).send({ data: selectedGoat })
//   } catch (error) {
//     res.status(404).send({ error: error.message })
//   }
// }