const { renderDOM } = require("./helpers")

let dom;
let document;

beforeAll(async () => {
    resultsDom = await renderDOM("./client/results.html")
    resultsDocument = await resultsDom.window.document
});

xdescribe("index.html", () => {
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

    it(`Start button exists`, () =>{
        const startBtn = document.getElementById("start").button
        expect(startBtn).toBeTruthy
    })

    xit('start button goes to game_page', () => {
        const startBtn = document.getElementById("start").button
        expect(startBtn.href).toContain(`/game_page.html`)
        
    })

    it(`initial setting exists`, () => {
        const settingContainer = document.getElementById(`initialSetting`)
        expect(settingContainer).toBeTruthy


    })

    it(`initial setting contains correct content`, () => {
        const settingContainer = document.getElementById(`initialSetting`)
        settingContainer.value = "You find yourself on a dusty platform, white smoke all around you...The platform is really busy, with all sorts of people, and someone starts to approach you..."
        expect(settingContainer.innerHTML).toContain(settingContainer.value)

    })

})


// describe("login.html", () => {
//     beforeEach(async () => {
//         dom = await renderDOM("./client/login.html")
//         document = await dom.window.document
//     })

// })


// describe("register.html", () => {
//     beforeEach(async () => {
//         dom = await renderDOM("./client/register.html")
//         document = await dom.window.document
//     })

// })

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

    it(`displays correct questions`, () =>{
        const gameContainer = document.getElementById(`gameContainer`)
        expect(gameContainer.innerHTML).toContain("what is 2+2?");
    })

    it(`correct answer returns correct message`, () =>{
        const form = document.querySelector(`form`)
        const gameContainer = document.getElementById(`gameContainer`)
        const select = document.querySelector("select[name='options']");
        select.value = "4";

        form.dispatchEvent(new dom.window.Event('submit'));

        expect(gameContainer.innerHTML).toContain("well done");
    })

    it(`wrong answer returns correct message`, () =>{
        const form = document.querySelector(`form`)
        const gameContainer = document.getElementById(`gameContainer`)
        const select = document.querySelector("select[name='options']");
        select.value = "6";

        form.dispatchEvent(new dom.window.Event('submit'));

        expect(gameContainer.innerHTML).toContain("no i dont think so");
    })

    it(`next question button displays new question`, () => {
        const nextBtn = document.getElementById(`go-next`)
        const gameContainer = document.getElementById(`gameContainer`)

        nextBtn.click()

        expect(gameContainer.innerHTML).toContain("what is 3+3?");
    })

    it(`next question button redirects to results when questions are finished`, () => {
        const form = document.querySelector(`form`)
        const nextBtn = document.getElementById("go-next")
        const gameContainer = document.getElementById("gameContainer")

        const select = document.querySelector("select[name='options']");
        //q1
        select.value = "4";
        form.dispatchEvent(new dom.window.Event('submit'));
        nextBtn.click()
        //q2
        select.value = "6"
        form.dispatchEvent(new dom.window.Event('submit'));
        nextBtn.click()
        //q3
        select.value = "8"
        form.dispatchEvent(new dom.window.Event('submit'));
        nextBtn.click()

        // check whether the html page displayed is Railway Revolution
        expect(resultsDocument.querySelector('h1').innerHTML).toBe("Railway Revolution Results")
    })

})

describe("results.html", () => {
    beforeEach(async () => {
        dom = await renderDOM("./client/results.html")
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

})
