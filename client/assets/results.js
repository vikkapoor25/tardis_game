const explanationContainer = document.querySelector("#explanation-container");
const resultsContainer = document.querySelector("#results-container")

// need async function for fetching results for total score on their scenario

// Async function for fetching explanation for all answers
async function fetchExplanation(){
    const response = await fetch("https://tardis-game.onrender.com/explanations/") 
    if (!response.ok){
        throw new Error("Not valid")
    }
    const data = await response.json()
    const explanations = data.data.map(el => el.explanation)
    console.log(explanations)
    return explanations
}

async function displayResult(score){
    let header = document.createElement("h2")
    const resultsCard = document.createElement("div")
    let resultText = document.createElement("p")

    resultsCard.className = "result-card"

    if (score===9){
        header.textContent = "Congratulations!"
        resultText.textContent = `You scored 3/3 on Railway Revolutions, Keep it up!`
    }else{
        header.textContent = "Almost!"
        resultText.textContent = `You scored ${score}/3 on Railway Revolutions, Go over the explanations below!`
    }

    resultsContainer.appendChild(resultsCard)
    resultsCard.appendChild(header)
    resultsCard.appendChild(resultText)
}

async function displayExplanations(){
    const explanations = await fetchExplanation()
    explanationContainer.innerHTML = "";
    if (explanations.length > 0){
        explanations.forEach((explanations) => {
            const explanationCard = document.createElement("div")
            const explanationText = document.createElement("p")
    
            explanationCard.className = "explanation-card"
    
            explanationText.textContent = explanations
    
            explanationContainer.appendChild(explanationCard)
            explanationCard.appendChild(explanationText)
        })
    }
}


const score = 3


displayExplanations();
displayResult(score);