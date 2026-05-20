const answerForm = document.querySelector("#answerForm");
const gameContainer = document.querySelector("#gameContainer");
const nextButton = document.querySelector("#go-next")
const gameHeader= document.querySelector("#game-header")
let questionNumber = -1
let score = 0

nextButton.addEventListener("click", () => loadQuestion(questionNumber))

//Load questions from API

async function getScenario() {
  const response = await fetch("http://localhost:3000/scenarios/");
  
  if (!response.ok) {
    throw new Error(`Failed to fetch scenario: ${response.status}`);
  }
  const responseObject = await response.json();
  const data = responseObject.data
  return data
}


// Check answer and go to next question
answerForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const form = new FormData(e.target);
    const scenario = await getScenario();
    const scenarioRow = scenario[questionNumber]
    if (form.get("options") === scenarioRow.answer){
        score +=1
        displayDialogue(scenarioRow.correct_response)
    }
    else{
        displayDialogue(scenarioRow.incorrect_response)
    }
    document.querySelector("#submitBtn").disabled = true

})

async function loadQuestion(inputQuestionNumber){
    if (questionNumber < 2){
        questionNumber+=1
        document.querySelector("#submitBtn").disabled = false
        const scenario = await getScenario();
        const scenarioRow = scenario[questionNumber]
        console.log(scenarioRow);
        const optionOne = document.querySelector("#option_one")
        const optionTwo = document.querySelector("#option_two")
        const optionThree = document.querySelector("#option_three")
        optionOne.value = scenarioRow.option_1
        optionTwo.value = scenarioRow.option_2
        optionThree.value = scenarioRow.option_3
        optionOne.textContent = optionOne.value
        optionTwo.textContent = optionTwo.value
        optionThree.textContent = optionThree.value
        gameHeader.textContent = `Mystery Scenario ${questionNumber+1}/3`
        displayDialogue(scenarioRow.question) 
    } else{
        window.location.assign("./results.html")
    }
    
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

