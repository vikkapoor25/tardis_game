const { renderDOM } = require("./helpers")

let dom;
let document;


describe("index.html", () => {
    beforeEach(async () => {
        dom = await renderDOM("./client/index.html")
        // we now have access to a fake 'document' for the rest of the tests
        document = await dom.window.document
    })

    it('has title', () => {
        const pageTitle = document.querySelector('h1')
        expect(pageTitle).toBeTruthy
        expect(pageTitle.innerHTML).toBe("Tardis")
    })
    
    it('has link to login page', () => {
        const loginLink = document.getElementById('login')
        expect(loginLink).toBeTruthy
        expect(loginLink.innerHTML).toBe("Login")
        expect(loginLink.href).toContain(`/login.html`)
    })

    it('has link to register page', () => {
        const loginLink = document.getElementById('register')
        expect(loginLink).toBeTruthy
        expect(loginLink.innerHTML).toBe("Sign up")
        expect(loginLink.href).toContain(`/register.html`)
    })

})


describe("initial_setting.html", () => {
    beforeEach(async () => {
        dom = await renderDOM("./client/initial_setting.html")
        document = await dom.window.document
    })

    it('has functional navbar', () => {
        const navbar = document.getElementById('navbar')
        expect(navbar).toBeTruthy

        const homeLink = document.getElementById('home-link')
        expect(homeLink.href).toContain('/index.html')

        const otherLinks = document.getElementsByClassName("nav-link")
        expect(otherLinks[0].href).toContain('/subjects.html')
        expect(otherLinks[1].href).toContain('/leaderboard.html')
        expect(otherLinks[2].href).toContain('/login.html')
    })

    // it(`Start button exists`, () =>{
    //     const startBtn = document.getElementById("startBtn")
    //     expect(startBtn).toBeTruthy
    // })

    // it('start button goes to game_page', () => {
    //     const startBtn = document.getElementById("startBtn")
    //     expect(startBtn.href).toContain(`/game_page.html`)
        
    // })

    // it(`initial setting exists`, () => {
    //     const settingContainer = document.getElementById(`initialSetting`)
    //     expect(settingContainer).toBeTruthy


    // })

})

describe("login.html", () => {
    beforeEach(async () => {
        dom = await renderDOM("./client/login.html")
        document = await dom.window.document
    })


    it(`Has a login form`, () =>{
        const form = document.getElementById('login-form')
        expect(form).toBeTruthy
    })

    it(`Has a username field`, () =>{
        const username = document.getElementById(`username`)
        expect(username).toBeTruthy
    })

    it(`Has a password field`, () =>{
        const password = document.getElementById(`password`)
        expect(password).toBeTruthy
    })

    it(`Has a submit method`, () => {
        const submit = document.getElementById('login-submit')
        expect(submit).toBeTruthy
    })

    xit(`don't have an account directs to regitser`, () => {
        const link = document.getElementById('link-to-register').a
        expect(link.href).toContain('/register.html')
    })

})

describe("register.html", () => {
    beforeEach(async () => {
        dom = await renderDOM("./client/register.html")
        document = await dom.window.document
    })

    it(`Has a register form`, () =>{
        const form = document.getElementById('register-form')
        expect(form).toBeTruthy
    })

    // it(`Has a submit method`, () => {
    //     const form = document.getElementById('register-form')
    //     form.dispatchEvent(new dom.window.Event('submit'));
    // })

    it('has a link redirecting to login page', () => {
        const loginRedirect = document.getElementById("login-link")
        expect(loginRedirect).toBeTruthy
        expect(loginRedirect.innerHTML).toContain("Already have an account?")
        expect(loginRedirect.innerHTML).toContain("./login.html")
    })

})

describe("game_page.html", () => {
    beforeEach(async () => {
        dom = await renderDOM("./client/game_page.html")
        document = await dom.window.document
    })

    it('has functional navbar', () => {
        const navbar = document.getElementById('navbar')
        expect(navbar).toBeTruthy

        const homeLink = document.getElementById('home-link')
        expect(homeLink.href).toContain('/index.html')

        const otherLinks = document.getElementsByClassName("nav-link")
        expect(otherLinks[0].href).toContain('/subjects.html')
        expect(otherLinks[1].href).toContain('/leaderboard.html')
        expect(otherLinks[2].href).toContain('/login.html')
    })

    // it(`displays correct questions`, () =>{
    //     const gameContainer = document.getElementById(`gameContainer`)
    //     expect(gameContainer.innerHTML).toContain("what is 2+2?");
    // })

    // it(`correct answer returns correct message`, () =>{
    //     const form = document.querySelector(`form`)
    //     const gameContainer = document.getElementById(`gameContainer`)
    //     const select = document.querySelector("select[name='options']");
    //     select.value = "4";

    //     form.dispatchEvent(new dom.window.Event('submit'));

    //     expect(gameContainer.innerHTML).toContain("well done");
    // })

    // it(`wrong answer returns correct message`, () =>{
    //     const form = document.querySelector(`form`)
    //     const gameContainer = document.getElementById(`gameContainer`)
    //     const select = document.querySelector("select[name='options']");
    //     select.value = "6";

    //     form.dispatchEvent(new dom.window.Event('submit'));

    //     expect(gameContainer.innerHTML).toContain("no i dont think so");
    // })

    // it(`next question button displays new question`, () => {
    //     const nextBtn = document.getElementById(`go-next`)
    //     const gameContainer = document.getElementById(`gameContainer`)

    //     nextBtn.click()

    //     expect(gameContainer.innerHTML).toContain("what is 3+3?");
    // })

})

// describe("results.html", () => {
//     beforeEach(async () => {
//         dom = await renderDOM("./client/results.html")
//         document = await dom.window.document
//     })

//     it('has functional navbar', () => {
//         const navbar = document.getElementById('navbar')
//         expect(navbar).toBeTruthy

//         const homeLink = document.getElementById('home-link')
//         expect(homeLink.href).toContain('/index.html')

//         const otherLinks = document.getElementsByClassName("nav-link")
//         expect(otherLinks[0].href).toContain('/subjects.html')
//         expect(otherLinks[1].href).toContain('/leaderboard.html')
//         expect(otherLinks[2].href).toContain('/login.html')
//     })

// })
