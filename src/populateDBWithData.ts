import { DexieDB } from "@/main";
import { Category } from "@const/Categories";
import { Expense } from "@const/Expense";
import { ExpenseGroup } from "@const/Groups";
import { TransactionType } from "@const/Variants";

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
        ...generateExpensesForGroup(TransactionType.Expense, ExpenseGroup.Home),
        ...generateExpensesForGroup(TransactionType.Earning, ExpenseGroup.Income),
        ...generateExpensesForGroup(TransactionType.Expense, ExpenseGroup.Food),
        ...generateExpensesForGroup(TransactionType.Expense, ExpenseGroup.HealthCare),
        ...generateExpensesForGroup(TransactionType.Expense, ExpenseGroup.Transport),
        ...generateExpensesForGroup(TransactionType.Expense, ExpenseGroup.Clothes),
        ...generateExpensesForGroup(TransactionType.Expense, ExpenseGroup.Entertainment),
        ...generateExpensesForGroup(TransactionType.Expense, ExpenseGroup.PersonalExpenses),
        ...generateExpensesForGroup(TransactionType.Expense, ExpenseGroup.Rest),
    ];

    console.table(entries);
    db.expenses.bulkAdd(entries); // apply new entires to db 
    // db.expenses.clear(); // clear the database
}

function generateExpensesForGroup(type: TransactionType, group: ExpenseGroup): Expense[] {
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