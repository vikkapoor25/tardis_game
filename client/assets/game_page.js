const answerForm = document.querySelector("#answerForm");
const gameContainer = document.querySelector("#gameContainer");
const nextButton = document.querySelector("#go-next")
const gameHeader= document.querySelector("#game-header")
let questionNumber = -1
let score = 0

nextButton.addEventListener("click", () => loadQuestion(questionNumber))

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
        },

    {question_id: 2,
    question: "what is 3+3?",
    answer: "6",
    correct_response: "well done",
    incorrect_reponse:"no i dont think so",
    option_1: "6",
    option_2:"4",
    option_3:"5",
    }
     
]
// Check answer and go to next question
answerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const form = new FormData(e.target);
    const scenarioRow = exampleQuestions[questionNumber]

    console.log(form.get("options"));
    console.log(scenarioRow);
    console.log(scenarioRow.answer)
    if (form.get("options") === scenarioRow.answer){
        score +=1
        displayDialogue(scenarioRow.correct_response)
    }
    else{
        //questionNumber +=1
        displayDialogue(scenarioRow.incorrect_reponse)
    }
    document.querySelector("#submitBtn").disabled = true

    //Lock form once submitted
    // const elements = answerForm.elements;
    // for (let i = 0; i < elements.length; i++) {
    //   elements[i].disabled = true;
    // }
})

function loadQuestion(inputQuestionNumber){
    questionNumber+=1
    document.querySelector("#submitBtn").disabled = false
    const scenarioRow = exampleQuestions[questionNumber]
    const optionOne = document.querySelector("#option_one")
    const optionTwo = document.querySelector("#option_two")
    const optionThree = document.querySelector("#option_three")
    optionOne.value = scenarioRow.option_1
    optionTwo.value = scenarioRow.option_2
    optionThree.value = scenarioRow.option_3
    optionOne.textContent = optionOne.value
    optionTwo.textContent = optionTwo.value
    optionThree.textContent = optionThree.value
    displayDialogue(scenarioRow.question)
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

loadQuestion(questionNumber);

//loadQuestion() -> displayDialogue()

// Load in question 1: loadQuestion(0)
// Display question 1: displayDialogue(scenarioRow.question)
//click submit to update dialogue:  displayDialogue()