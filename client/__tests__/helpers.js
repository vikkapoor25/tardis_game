const path = require("path")
// what is jsdom - javascript document object model
// = emulates the browsers behaviour to test a frontend application
const jsdom = require("jsdom")

// gets JSDOM constructor from the module
const { JSDOM } = jsdom

const renderDOM = async (filename) => {
    // gets current working directory
    const filePath = path.join(process.cwd(), filename)


    const dom = await JSDOM.fromFile(filePath, {
        runScripts: 'dangerously', // enables executing scripts inside the page - what is page here?
        resources: 'usable' // enables loading and execution of external scripts included via script src=""
    })

    return new Promise((resolve, _) => {
        // wait for DOM content to have loaded and then resolve the promise
        dom.window.document.addEventListener('DOMContentLoaded', () => {
            resolve(dom)
        })
    })
}

module.exports = {
    renderDOM
}