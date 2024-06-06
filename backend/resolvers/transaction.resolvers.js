import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";
const transactionsResolver = {
    Query: {
        transactions: async (_, __, context) => {
            try {
                if (!context.getUser()) throw new Error("Unauthorized");
                const userId = await context.getUser()._id;

                const transactions = await Transaction.find({ userId });
                return transactions;
            } catch (err) {
                console.error("Error getting transactions:", err);
                throw new Error("Error getting transactions");
            }
        },
        transaction: async (_, { transactionId }) => {
            try {
                const transaction = await Transaction.findById(transactionId);
                return transaction;
            } catch (err) {
                console.error("Error getting transaction:", err);
                throw new Error("Error getting transaction");
            }
        },
    },

    Mutation: {
        createTransaction: async (__, { input }, context) => {
            try {
                const newTransaction = new Transaction({
                    ...input,
                    userId: context.getUser()._id,
                })
                await newTransaction.save()
                return newTransaction;
            } catch (err) {
                console.error("Error creating transaction:", err);
                throw new Error("Error creating transaction");
            }
        },
        updateTransaction: async (__, { input }) => {
            try {
                const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, { new: true });
                if (!updatedTransaction) {
                    throw new Error("Transaction not found or update failed");
                }
                return updatedTransaction;

            } catch (err) {
                console.error("Error updating transaction:", err);
                throw new Error("Error updating transaction");
            }
        },
        deleteTransaction: async (_, { transactionId }) => {
            try {
                const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
                return deletedTransaction;
            } catch (err) {
                console.error("Error deleting transaction:", err);
                throw new Error("Error deleting transaction");
            }
        },
    },
}

export default transactionsResolver