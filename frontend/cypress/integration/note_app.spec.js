// note_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Note app', function () {
  beforeEach(function () {

    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Diego Hamlet',
      username: 'diego',
      password: 'diego'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2021')
  })

  it('login form can be opened', function () {
    cy.contains('log in').click()
    cy.get('#username').type('diego')
    cy.get('#password').type('diego')
    cy.get('#login-button').click()

    cy.contains('Hamlet logged in')
  })
})

describe('when logged in', function () {

  beforeEach(function () {
    cy.visit('http://localhost:3000')
    cy.contains('log in').click()
    cy.get('#username').type('diego')
    cy.get('#password').type('diego')
    cy.get('#login-button').click()
  })

  it('a new note can be created', function () {
    cy.contains('New Note').click()
    cy.get('input').type('a note created by cypress')
    cy.contains('Save').click()
    cy.contains('a note created by cypress')
  })
})
