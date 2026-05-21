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

})

describe("login.html", () => {
    beforeEach(async () =>{
        dom = await renderDOM("./client/login.html")
        document = await dom.window.document
    })

    it('blank test', () => {
        expect(1).toBeTruthy
    })

    it(`Has a password field`, () => {
        const password = document.getElementById(`password`)
        expect(password).toBeTruthy
    })

    it(`Has a submit method`, () => {
        const submit = document.getElementById('login-submit')
        expect(submit).toBeTruthy
    })

    it(`don't have an account directs to regitser`, () => {
        const linkReg = document.getElementById('link-to-register')
        expect(linkReg.href).toContain('/register.html')
    })

    it(`Has a username field`, () =>{
        const username = document.getElementById(`username`)
        expect(username).toBeTruthy
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

})
