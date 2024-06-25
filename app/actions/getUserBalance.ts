"use server"
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";


async function getUserBalance(): Promise<{
    balance?: number;
    error?: string;
}> {
    const { userId } = auth();

    if (!userId) {
        return { error: 'user not found' }
    }

    try {
        const transactions = await db.transaction.findMany({
            where: { userId }
        });

        return { balance: transactions.reduce((sum, transaction) => sum + transaction.amount, 0) };

    } catch (error) {
        return { error: 'Database error' }
    }
}

export default getUserBalance;