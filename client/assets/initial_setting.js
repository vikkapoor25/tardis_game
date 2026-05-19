document.getElementById("start").addEventListener("click", (e) => {
    e.preventDefault()

    window.location.assign("game_page.html")
})

// update gameContainer to have overlay context info
//async
function addContext() {
    const gameContainer = document.getElementById("gameContainer")

    // scenario_id in this MVP is 1, hardcoded?
    const scenario_id = 1

    // requires api function to retrieve initial_setting from scenarios table using scenario_id
    // const response = await fetch(`render_deployed_api/${scenario_id}`)
    // const initialSetting = response.initial_setting
    const initialSetting = "Test string - youre on a platform!"


    const initialSettingSection = document.createElement("p")
    initialSettingSection.id = "initialSetting"
    initialSettingSection.textContent = initialSetting

    gameContainer.appendChild(initialSettingSection)
    
}

addContext()





