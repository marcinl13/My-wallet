import { Category } from "./Categories";
import { ExpenseGroup } from "./Groups";
import { TransactionType } from "./Variants";

export type Expense = {
    readonly id?: number;
    amount: number;
    text: string;
    type: `${TransactionType}`;
    group: `${ExpenseGroup}`;
    category: Category;
    createdAt: Date;
};

export type ExpenseId = Expense["id"];
