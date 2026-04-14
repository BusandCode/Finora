export interface Loan {
  id: string;
  userId: string;
  amount: number;
  tenure: number;
  interest: number;
  purpose: string;
  status: "Active" | "Completed" | "Pending" | "Rejected";
  startDate: string;
  endDate: string;
}

export interface Transaction {
  id: string;
  userId: string;
  reference: string;
  type: "Loan Disbursement" | "Repayment";
  amount: number;
  date: string;
  status: "Successful" | "Pending" | "Failed";
}

export interface Repayment {
  id: string;
  userId: string;
  loanId: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue";
}

const LOANS_KEY = "mock_db_loans";
const TXNS_KEY = "mock_db_transactions";
const REPAYMENTS_KEY = "mock_db_repayments";

const getStore = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveStore = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const dataService = {
  getUserLoans: (userId: string): Loan[] => {
    return getStore<Loan>(LOANS_KEY).filter((item) => item.userId === userId);
  },

  getUserTransactions: (userId: string): Transaction[] => {
    return getStore<Transaction>(TXNS_KEY).filter((item) => item.userId === userId);
  },

  getUserRepayments: (userId: string): Repayment[] => {
    return getStore<Repayment>(REPAYMENTS_KEY).filter((item) => item.userId === userId);
  },

  applyForLoan: async (userId: string, amount: number, tenure: number, purpose: string): Promise<Loan> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const loans = getStore<Loan>(LOANS_KEY);

        const now = new Date();
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + tenure);

        // Create Pending Loan (No Transactions/Repayments Yet)
        const newLoan: Loan = {
          id: `LN-${Math.floor(10000 + Math.random() * 90000)}`,
          userId,
          amount,
          tenure,
          interest: 12, // Default 12%
          purpose,
          status: "Pending", // Was "Active"
          startDate: now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          endDate: endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        };

        loans.push(newLoan);
        saveStore(LOANS_KEY, loans);

        resolve(newLoan);
      }, 800); // Network simulation
    });
  },

  getAllLoans: (): Loan[] => {
    return getStore<Loan>(LOANS_KEY);
  },

  approveLoan: async (loanId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const loans = getStore<Loan>(LOANS_KEY);
        const loanIndex = loans.findIndex((l) => l.id === loanId);

        if (loanIndex === -1) return reject(new Error("Loan not found"));

        // Set status to Active
        loans[loanIndex].status = "Active";
        const approvedLoan = loans[loanIndex];
        saveStore(LOANS_KEY, loans);

        // Generate Disbursement Transaction
        const txns = getStore<Transaction>(TXNS_KEY);
        const now = new Date();
        const newTxn: Transaction = {
          id: Date.now().toString(),
          userId: approvedLoan.userId,
          reference: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
          type: "Loan Disbursement",
          amount: approvedLoan.amount,
          date: now.toISOString().split("T")[0],
          status: "Successful",
        };
        txns.push(newTxn);
        saveStore(TXNS_KEY, txns);

        // Generate Pending Repayment
        const repayments = getStore<Repayment>(REPAYMENTS_KEY);
        const firstPaymentDate = new Date();
        firstPaymentDate.setMonth(now.getMonth() + 1);
        
        const totalToRepay = approvedLoan.amount + (approvedLoan.amount * 0.12);
        const monthlyAmount = totalToRepay / approvedLoan.tenure;
        
        const newRepayment: Repayment = {
          id: `RP-${Math.floor(10000 + Math.random() * 90000)}`,
          userId: approvedLoan.userId,
          loanId: approvedLoan.id,
          amount: Math.round(monthlyAmount),
          dueDate: firstPaymentDate.toISOString().split("T")[0],
          status: "Pending",
        };
        repayments.push(newRepayment);
        saveStore(REPAYMENTS_KEY, repayments);

        resolve();
      }, 600);
    });
  },

  rejectLoan: async (loanId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const loans = getStore<Loan>(LOANS_KEY);
        const loanIndex = loans.findIndex((l) => l.id === loanId);
        if (loanIndex === -1) return reject(new Error("Loan not found"));

        loans[loanIndex].status = "Rejected"; 
        saveStore(LOANS_KEY, loans);
        resolve();
      }, 400); // Simulate network
    });
  },
};
