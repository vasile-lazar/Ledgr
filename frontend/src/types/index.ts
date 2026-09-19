export interface User {
    id: number;
    username: string;
    email: string;
}

export type TransactionCategory =
    | 'Groceries' | 'Transport' | 'Salary' | 'Entertainment'
    | 'Dining' | 'Shopping' | 'Utilities' | 'Other';

export interface ParsedTransaction {
    date: string;
    merchant: string;
    amount: number;
    category: TransactionCategory;
}

export interface Transaction extends ParsedTransaction {
    id: number;
}

export interface Statement {
    id: number;
    filePath: string;
    date: string;
    transactions: number;
}

export interface Budget {
    id: number;
    category: TransactionCategory;
    amount: number;
    used: number;
    date: string;
}

export interface MonthlyIncomeExpense {
    year: number;
    month: number;
    value: number;
}

export interface CategoryExpense {
    category: TransactionCategory;
    expense: number;
}