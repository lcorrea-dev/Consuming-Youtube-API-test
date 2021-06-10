// https://docs.cypress.io/api/introduction/api.html

describe('Home page tests', () => {
  it('Home page renders correctly', () => {
    cy.visit('/');
    cy.contains('Search in youtube videos');
    cy.get('input').should('have.value', '');
  });

  it('One search retrieves 36 results', () => {
    cy.visit('/');
    cy.get('input').type('Cypress End-to-End Testing').type('{enter}');
    cy.get('.my-card').should('have.length', 36);
  });

  it('Get next 36 results by scrolling down', () => {
    cy.server();
    cy.route('GET', `${Cypress.env('VUE_APP_API_HOST')}/**`).as('dataGetFirst');
    cy.visit('/');
    cy.get('input').type('Cypress End-to-End Testing').type('{enter}');
    cy.get('.my-card').should('have.length', 36);
    cy.scrollTo('bottom');
    cy.wait('@dataGetFirst');
    cy.get('.my-card').should('have.length', 36 * 2);
  });

  it('Can not search if you have 0 characters in input', () => {
    cy.visit('/');
    cy.get('input').type('{enter}');
    cy.contains('Please try again.');
    cy.get('.my-card').should('have.length', 0);
  });

  it('Can not search if you have more than 256 characters in input', () => {
    cy.visit('/');
    cy.get('input').type('A'.repeat(257)).type('{enter}');
    cy.contains('Please try again.');
    cy.get('.my-card').should('have.length', 0);
  });
});
