"use server"
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";


async function getTransactions(): Promise<{
    transactions?: Transaction[];
    error?: string;
}> {
    const { userId } = auth();

    if (!userId) {
        return { error: 'user not found' }
    }

    try {
        const transactions = await db.transaction.findMany({
            where: { userId },
            orderBy: {
                createdAt: 'desc'
            }
        });

      return {transactions};

    } catch (error) {
        return { error: 'Database error' }
    }
}

export default getTransactions;

interface Transaction {
    id: string;
    text: string;
    amount: number;
    userId: string;
    createdAt: Date;
}