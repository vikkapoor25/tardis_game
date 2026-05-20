document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault()

    const form = new FormData(e.target)

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password")
        })
    }

    const response = await fetch("render_deployed_api/users/register", options)
    const data = await response.json()

    if (response.status == 201) {
        //after registering, go back to login page
        alert("Successfully registered!")
        window.location.assign("login.html")
    } else {
        alert("Looks like there was a problem registering..." + data.error)
    }
})