interface Transaction {
  name: string;
  value: number;
  category: string;
  createAt: string;
}
export interface DashTransactionModel {
  OUTPUT: Transaction[];
  INPUT: Transaction[];
}
