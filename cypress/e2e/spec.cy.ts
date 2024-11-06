describe('My First Test', () => {
  it('Visits the chatbot page', () => {
    cy.visit('http://localhost:4200/')

    cy.get('[data-cy="input-text-area"]').should('have.value', '我喜欢摇滚乐，给我推荐一个乐器吧');
    cy.get('[data-cy="input-text-area"]').type('{enter}');
    cy.get('[data-cy="input-text-area"]').should('have.value', '\n');
    cy.get('[data-cy="question-area"]').should('contain.text', '你：我喜欢摇滚乐，给我推荐一个乐器吧');
    cy.get('[data-cy="response-area"]').should('contain.text', '小乐：');
  })
})
