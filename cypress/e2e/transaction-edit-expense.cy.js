import { earningList, fakeTransactions } from '../fixtures/fakeTransactions';
import { numberToCurrency, selector, visitRoute } from '../support/utils';

const newAmount = 120;
const newTitle = 'Updated Expense entry';

describe('Test edit expense transaction', () => {
  beforeEach(() => {
    cy.clearTransactions();
    cy.createTransactionsObjectStore().as('objectStore');

    // populate indexedDb
    fakeTransactions.map((t) => cy.getStore('@objectStore').addItem(t));
  });

  it('Update data', () => {
    cy.visit(visitRoute.Home);

    // Pick first expense on the list
    cy.get(selector.recentlyAdded.tab.expense).click();
    cy.get(selector.recentlyAdded.list).children().first().click();

    // Change the amount
    cy.get(selector.form.inputTitle).clear().type(newTitle);
    cy.get(selector.form.inputAmount).clear().type(newAmount.toString());
    cy.get(selector.form.btnSubmit).click();

    // Check if value has been updated
    cy.visit(visitRoute.Home);
    cy.get(selector.recentlyAdded.tab.expense).click();

    // Check if data was not removed in the process
    cy.get(selector.recentlyAdded.list).children().should('have.length', earningList.length);

    // Check if values has been updated
    cy.get(selector.recentlyAdded.listItem.title).first().should('have.text', newTitle);
    cy.get(selector.recentlyAdded.listItem.amount).first().should('have.text', numberToCurrency(newAmount));
  });
});
