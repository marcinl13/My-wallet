import { Category } from "./Categories";
import { TransactionGroup } from "./Groups";

export const categoryDictionary = {
    [TransactionGroup.Home]: ["Current", "Gas", "Water", "Heating", "Rent", "Equipment", "Media", "Renovation", "CleaningProducts"] as Category[],
    [TransactionGroup.Other]: ["Salary", "Bonus", "Scholarship"] as Category[],
    [TransactionGroup.Food]: ["EatingOut", "Groceries"] as Category[],
    [TransactionGroup.HealthCare]: ["Dentist", "Medicine"] as Category[],
    [TransactionGroup.Transport]: ["Tickets", "Fuel", "Parking", "Repairs", "FeesOrInsurance", "Wash", "Accessories"] as Category[],
    [TransactionGroup.Clothes]: ["Clothes", "Jewelry", "Perfume"] as Category[],
    [TransactionGroup.Entertainment]: ["Gifts", "Games", "Sport"] as Category[],
    [TransactionGroup.PersonalExpenses]: ["Studies", "Training"] as Category[],
    [TransactionGroup.Rest]: ["Accommodation", "Food", "Attractions"] as Category[]
};
