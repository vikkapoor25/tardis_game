const explanationContainer = document.querySelector("#explanation-container");
const resultsContainer = document.querySelector("#results-container")

// need async function for fetching results for total score on their scenario

// need async function for fetching results for all wrong answer explanations for the scenario

async function displayExplanations(explanation){
    explanationContainer.innerHTML = "";
    if (explanation.length > 0){
        explanation.forEach((explanation) => {
            const explanationCard = document.createElement("div")
            const explanationText = document.createElement("p")
    
            explanationCard.className = "explanation-card"
    
            explanationText.textContent = explanation.text
    
            explanationContainer.appendChild(explanationCard)
            explanationCard.appendChild(explanationText)
        })
    }
}

const explanations = [
    { text: "Example of explantions 1" },
    { text: "Example of explantions 2" }
];


displayExplanations(explanations);