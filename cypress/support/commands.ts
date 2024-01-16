/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import '@this-dot/cypress-indexeddb';

import { Expense } from '../../src/const/Expense';
import { TransactionType } from '../../src/const/Variants';
import { useRelativeTimeFormat } from '../../src/hooks/useRelativeTimeFormat';
import { numberToCurrency, selector } from './utils';

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args)
})

Cypress.Commands.add('fillForm', (expense: Expense) => {
  cy.get(selector.form.inputTitle).clear().type(expense.text);
  cy.get(selector.form.inputAmount).clear().type(expense.amount.toString());
  cy.get(selector.form.selectGroup).select(expense.group);
  cy.get(selector.form.selectCategory).select(expense.category);
  cy.get(selector.form.btnSubmit).click();
})

Cypress.Commands.add('validateRecentlyCreatedListItem', (expense: Expense) => {
  const createdTimeAgo = useRelativeTimeFormat(expense.createdAt);

  cy.get('[data-testid="list"]').children().should('have.length', 1);

  cy.get(`[data-testid="list-item-icon"]`).children().should('have.length', 1);
  cy.get(`[data-testid="list-item-icon-expense"]`).should(expense.type === TransactionType.Expense ? 'be.visible' : 'not.exist');
  cy.get(`[data-testid="list-item-icon-earning"]`).should(expense.type === TransactionType.Earning ? 'be.visible' : 'not.exist');

  cy.get(`[data-testid="list-item-text"]`).should('have.text', expense.text);
  cy.get(`[data-testid="list-item-time"]`).should('have.text', createdTimeAgo);
  cy.get(`[data-testid="list-item-amount"]`).should('have.text', numberToCurrency(expense.amount));
})

Cypress.Commands.add('clearTransactionsDB', (expense: Expense) => {
  cy.clearIndexedDb('transactions');
})
