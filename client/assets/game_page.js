// Submit form selction to api
const answerForm = document.querySelector("#answerForm");
const gameContainer = document.querySelector("#gameContainer");

answerForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const form = new FormData(e.target);

    console.log(form);

     const options = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            option: form.get("options"),
        })
    }
    // Add fetch request to api link here
    const response;
    displayDialgoue(response);

})
//Load questions
function getQuestions(){
    const response;
    
}

// Display dialogue 
function displayDialogue(dialogue){
    const speechBubble = document.createElement("p");
    speechBubble.innerHTML = dialogue;
    speechBubble.style.background = "white";
    gameContainer.appendChild(speechBubble)
}