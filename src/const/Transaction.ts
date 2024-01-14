import { Category } from "./Categories";
import { ExpenseGroup } from "./Groups";
import { TransactionType } from "./Variants";

export type Transaction = {
    readonly id?: number;
    amount: number;
    text: string;
    type: `${TransactionType}`;
    group: `${ExpenseGroup}`;
    category: Category;
    createdAt: Date;
};

export type TransactionId = Transaction["id"];
