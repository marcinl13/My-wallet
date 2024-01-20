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

import { Transaction } from '../../src/const/Transaction';
import { TransactionType } from '../../src/const/Variants';
import { useRelativeTimeFormat } from '../../src/hooks/useRelativeTimeFormat';
import { numberToCurrency, selector } from './utils';

declare global {
  namespace Cypress {
    interface Chainable {
      fillForm(expense: Transaction): Chainable<void>;
      validateRecentlyCreatedListItem(expense: Transaction): Chainable<void>;
      clearTransactions(): Chainable<Element>;
      openTransactions(): Chainable<Element>;
      createTransactionsObjectStore(): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('clearTransactions', () => cy.clearIndexedDb('transactions'));

Cypress.Commands.add('openTransactions', () => {
  cy.openIndexedDb('transactions');
});

Cypress.Commands.add('createTransactionsObjectStore', () => {
  cy.openTransactions().as('formCacheDB').createObjectStore('transactions', {
    keyPath: 'id',
    autoIncrement: true
  });
});

Cypress.Commands.add('fillForm', (expense: Transaction) => {
  cy.get(selector.form.inputTitle).clear().type(expense.text);
  cy.get(selector.form.inputAmount).clear().type(expense.amount.toString());
  cy.get(selector.form.selectGroup).select(expense.group);
  cy.get(selector.form.selectCategory).select(expense.category);
  cy.get(selector.form.btnSubmit).click();
});

Cypress.Commands.add('validateRecentlyCreatedListItem', (expense: Transaction) => {
  const createdTimeAgo = useRelativeTimeFormat(expense.createdAt);

  cy.get(selector.recentlyAdded.list).children().should('have.length', 1);

  cy.get(selector.recentlyAdded.listItem.iconExpense).should(
    expense.type === TransactionType.Expense ? 'be.visible' : 'not.exist'
  );
  cy.get(selector.recentlyAdded.listItem.iconEarning).should(
    expense.type === TransactionType.Earning ? 'be.visible' : 'not.exist'
  );

  cy.get(selector.recentlyAdded.listItem.title).should('have.text', expense.text);
  cy.get(selector.recentlyAdded.listItem.time).should('have.text', createdTimeAgo);
  cy.get(selector.recentlyAdded.listItem.amount).should('have.text', numberToCurrency(expense.amount));
});
