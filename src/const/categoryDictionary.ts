import { Category } from "./Categories";
import { ExpenseGroup } from "./Groups";

export const categoryDictionary = {
    [ExpenseGroup.Home]: ["Current", "Gas", "Water", "Heating", "Rent", "Equipment", "Media", "Renovation", "CleaningProducts"] as Category[],
    [ExpenseGroup.Income]: ["Salary", "Bonus", "Scholarship"] as Category[],
    [ExpenseGroup.Food]: ["EatingOut", "Groceries"] as Category[],
    [ExpenseGroup.HealthCare]: ["Dentist", "Medicine"] as Category[],
    [ExpenseGroup.Transport]: ["Tickets", "Fuel", "Parking", "Repairs", "FeesOrInsurance", "Wash", "Accessories"] as Category[],
    [ExpenseGroup.Clothes]: ["Clothes", "Jewelry", "Perfume"] as Category[],
    [ExpenseGroup.Entertainment]: ["Gifts", "Games", "Sport"] as Category[],
    [ExpenseGroup.PersonalExpenses]: ["Studies", "Training"] as Category[],
    [ExpenseGroup.Rest]: ["Accommodation", "Food", "Attractions"] as Category[]
};
