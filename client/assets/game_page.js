const answerForm = document.querySelector("#answerForm");
const gameContainer = document.querySelector("#gameContainer");
const nextButton = document.querySelector("#go-next")
const questionNumber = 1
const score = 0

nextButton.addEventListener("click", loadQuestion())

//Load questions from API
// const scenario
function getScenario(scenario_id){
    // const response;
    // return response
}
//scenario = getScenario()

// Test data
const exampleQuestions = [
    {question_id: 1,
    question: "what is 2+2?",
    answer: "4",
    correct_response: "well done",
    incorrect_reponse:"no i dont think so",
    option_1: "3",
    option_2:"4",
    option_3:"5",
    explanation:"explain addition"},

    {question_id: 2,
    question: "what is 3+3?",
    answer: "6",
    correct_response: "well done",
    incorrect_reponse:"no i dont think so",
    option_1: "6",
    option_2:"4",
    option_3:"5",
    explanation:"explain addition"},
     
]
// Check answer and go to next question
answerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const form = new FormData(e.target);
    const scenarioRow = exampleQuestions.question_id

    console.log(form);
    if (form.get("options") == scenarioRow.answer){
        score +=1
        //questionNumber +=1 add in go next
        displayDialogue(scenarioRow.correct_response)
    }
    else{
        //questionNumber +=1
        displayDialogue(scenarioRow.incorrect_reponse)
    }
    // loadNextQuestion() += in next button
})

function loadQuestion(question_id){
    document.querySelector("#option_one").value = scenario.rows[question_id].option_1
    document.querySelector("#option_two").value = scenario.rows[question_id].option_2
    document.querySelector("#option_three").value = scenario.rows[question_id].option_3
    displayDialogue(scenario.rows[question_id].question)
}

// Display dialogue 
function displayDialogue(dialogue){
    gameContainer.innerHTML="";
    const speechBubble = document.createElement("div");
    const questionText = document.createElement("p")
    speechBubble.className = "speech-bubble"
    questionText.textContent = dialogue
    gameContainer.appendChild(speechBubble)
    speechBubble.appendChild(questionText)
    
}

displayDialogue(exampleQuestions.question);