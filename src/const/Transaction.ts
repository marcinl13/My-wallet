import { Category } from "./Categories";
import { TransactionGroup } from "./Groups";
import { TransactionType } from "./Variants";

export type Transaction = {
    readonly id?: number;
    amount: number;
    text: string;
    type: `${TransactionType}`;
    group: `${TransactionGroup}`;
    category: Category;
    createdAt: Date;
};

export type TransactionId = Transaction["id"];
