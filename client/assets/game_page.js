const answerForm = document.querySelector("#answerForm");
const gameContainer = document.querySelector("#gameContainer");
const nextButton = document.querySelector("#go-next")
const gameHeader= document.querySelector("#game-header")
let questionNumber = -1
let score = 0



//Load questions from API

async function getScenario() {
    const options = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };

  const response = await fetch("https://tardis-game.onrender.com/scenarios/", options);
  
  if (!response.ok) {
    window.location.assign("./login.html")
  }
  const responseObject = await response.json();
  const data = responseObject.data
  return data
}

getScenario().then( data => {

    // submit answer
    answerForm.addEventListener("submit",  (e) => {
    e.preventDefault()
    const form = new FormData(e.target);
    const scenario = data;
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

    // Load next question
    function loadQuestion(){
    if (questionNumber < 3){
        questionNumber+=1
        document.querySelector("#submitBtn").disabled = false
        const scenario = data;
        const scenarioRow = scenario[questionNumber]
        console.log(scenarioRow);
        const optionOne = document.querySelector("#option_one")
        const optionTwo = document.querySelector("#option_two")
        optionOne.value = scenarioRow.option_1
        optionTwo.value = scenarioRow.option_2
        optionOne.textContent = optionOne.value
        optionTwo.textContent = optionTwo.value
        gameHeader.textContent = `Mystery Scenario ${questionNumber+1}/3`
        displayDialogue(scenarioRow.question) 
    } else{
        window.location.assign("./results.html")
    }
    
    }
    nextButton.addEventListener("click", () => loadQuestion(questionNumber))
    loadQuestion(questionNumber)
}
)



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



