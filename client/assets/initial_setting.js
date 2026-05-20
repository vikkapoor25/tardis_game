// update gameContainer to have overlay context info
//async
function addContext() {
    const gameContainer = document.getElementById("gameContainerInitialSetting")

    // scenario_id in this MVP is 1, hardcoded?
    const scenario_id = 1

    // requires api function to retrieve initial_setting from scenarios table using scenario_id
    // const response = await fetch(`render_deployed_api/${scenario_id}`)
    // const initialSetting = response.initial_setting
    const initialSetting = "You find yourself on a dusty platform, white smoke all around you...The platform is really busy, with all sorts of people, and someone starts to approach you..."


    const initialSettingSection = document.createElement("p")
    initialSettingSection.id = "initialSetting"
    initialSettingSection.textContent = initialSetting

    gameContainer.appendChild(initialSettingSection)
    
}

addContext()





