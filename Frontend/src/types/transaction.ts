export interface Transaction {
    id?: number;
    description: string;
    amount: number;
    type: "INCOME" | "EXPENSE";
    category: string;
    date: string;
}
