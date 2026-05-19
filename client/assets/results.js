const explanationContainer = document.querySelector("#explanation-container");
const resultsContainer = document.querySelector("#results-container")

// need async function for fetching results for total score on their scenario

// need async function for fetching results for all wrong answer explanations for the scenario

async function displayResult(score){
    let header = document.createElement("h2")
    const resultsCard = document.createElement("div")
    let resultText = document.createElement("p")

    resultsCard.className = "result-card"

    if (score===9){
        header.textContent = "Congratulations!"
        resultText.textContent = `You scored 9/9 on Railway Revolutions, Keep it up!`
    }else{
        header.textContent = "Almost!"
        resultText.textContent = `You scored ${score}/9 on Railway Revolutions, Go over the explanations below!`
    }

    resultsContainer.appendChild(resultsCard)
    resultsCard.appendChild(header)
    resultsCard.appendChild(resultText)
}

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

const score = 5


displayExplanations(explanations);
displayResult(score);