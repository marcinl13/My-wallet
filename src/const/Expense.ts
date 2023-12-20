import { Category } from "./Categories";
import { ExpenseGroup } from "./Groups";
import { ExpenseType } from "./Variants";

export type Expense = {
    readonly id?: number;
    amount: number;
    text: string;
    type: `${ExpenseType}`;
    group: `${ExpenseGroup}`;
    category: Category;
    createdAt: Date;
};

export type ExpenseId = Expense["id"];
