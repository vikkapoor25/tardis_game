document.getElementById("start").addEventListener("click", (e) => {
    e.preventDefault()

    window.location.assign("game_page.html")
})

// update gameContainer to have overlay context info
//async

async function fetchSetting(){
    const response = await fetch("http://localhost:3000/explanations/") 

    if (!response.ok){
        throw new Error("Not valid")
    }
    const data = await response.json()
    return data.data[0].initial_setting
}

async function addContext() {
    const gameContainer = document.getElementById("gameContainerInitialSetting")
    const initialSetting =  await fetchSetting()
    console.log(initialSetting)

    const initialSettingSection = document.createElement("p")
    initialSettingSection.id = "initialSetting"
    initialSettingSection.textContent = initialSetting

    gameContainer.appendChild(initialSettingSection)
    
}

addContext()





