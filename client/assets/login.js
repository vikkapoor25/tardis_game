document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault()

    const form = new FormData(e.target)

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password")
        })
    }

    // const response = await fetch("render_api_link/users/login", options)
    // const data = await response.json()
    const response = {
        status: 200
    }

    if (response.status == 200) {
        //token stuff - not adding yet
        window.location.assign("initial_setting.html")
    } else {
        alert("Looks like there was a problem logging in..." + data.error)
    }
})