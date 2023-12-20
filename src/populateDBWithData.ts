import { DexieDB } from "./main";

import { Category } from "@const/Categories";
import { Expense } from "@const/Expense";
import { ExpenseGroup } from "@const/Groups";
import { ExpenseType } from "@const/Variants";

const dictionary = {
    [ExpenseGroup.Home]: ["Current", "Gas", "Water", "Heating", "Rent", "Equipment", "Media", "Renovation", "CleaningProducts"],
    [ExpenseGroup.Income]: ["Salary", "Bonus", "Scholarship"],
    [ExpenseGroup.Food]: ["EatingOut", "Groceries"],
    [ExpenseGroup.HealthCare]: ["Dentist", "Medicine"],
    [ExpenseGroup.Transport]: ["Tickets", "Fuel", "Parking", "Repairs", "FeesOrInsurance", "Wash", "Accessories"],
    [ExpenseGroup.Clothes]: ["Clothes", "Jewelry", "Perfume"],
    [ExpenseGroup.Entertainment]: ["Gifts", "Games", "Sport"],
    [ExpenseGroup.PersonalExpenses]: ["Studies", "Training"],
    [ExpenseGroup.Rest]: ["Accommodation", "Food", "Attractions"]
};

export function populateDBWithData(db: DexieDB) {
    const entries: Expense[] = [
        ...generateExpensesForGroup(ExpenseType.Expense, ExpenseGroup.Home),
        ...generateExpensesForGroup(ExpenseType.Earning, ExpenseGroup.Income),
        ...generateExpensesForGroup(ExpenseType.Expense, ExpenseGroup.Food),
        ...generateExpensesForGroup(ExpenseType.Expense, ExpenseGroup.HealthCare),
        ...generateExpensesForGroup(ExpenseType.Expense, ExpenseGroup.Transport),
        ...generateExpensesForGroup(ExpenseType.Expense, ExpenseGroup.Clothes),
        ...generateExpensesForGroup(ExpenseType.Expense, ExpenseGroup.Entertainment),
        ...generateExpensesForGroup(ExpenseType.Expense, ExpenseGroup.PersonalExpenses),
        ...generateExpensesForGroup(ExpenseType.Expense, ExpenseGroup.Rest),
    ];

    console.table(entries);
    db.expenses.bulkAdd(entries); // apply new entires to db 
    // db.expenses.clear(); // clear the database
}

function generateExpensesForGroup(type: ExpenseType, group: ExpenseGroup): Expense[] {
    const randomAmountOfItems = Math.floor(Math.random() * 6) + 3;
    const arr: Expense[] = []

    for (let i = 0; i < randomAmountOfItems; i++) {
        const availableCategories = dictionary[group] as Category[];
        const randomCategoryIndex = Math.floor(Math.random() * availableCategories.length);

        arr.push({
            amount: Math.floor(Math.random() * 91) + 15,
            text: `New ${type} entry`,
            type: type,
            group: group,
            category: availableCategories[randomCategoryIndex],
            createdAt: new Date()
        })
    }

    return arr;
}