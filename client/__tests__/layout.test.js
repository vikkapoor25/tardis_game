const { renderDOM } = require("./helpers")

let dom;
let document;

describe("index.html", () => {
    beforeEach(async () => {
        dom = await renderDOM("./index.html")
        // we now have access to a fake document for the rest of the tests
        document = await dom.window.document
    })

    it('has title', () => {
        const pageTitle = document.querySelector('h1')
        expect(pageTitle).toBeTruthy
        expect(pageTitle.innerHTML).toBe("Tardis")
    })

})

describe("initial_setting.html", () => {

})


describe("login.html", () => {

})


describe("register.html", () => {

})
