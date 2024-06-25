"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface TransactionData {
    text: String;
    amount: Number;
}

interface TransactionResult {
    data?: TransactionData;
    error?: String;
}

async function addTransaction(formData: FormData): Promise<TransactionResult> {

    const textValue = formData.get("text");
    const amountValue = formData.get("amount");

    if (!textValue || textValue === '' || !amountValue) {
        return { error: 'Text or amount missing' };
    }

    const text: string = textValue.toString();
    const amount: number = parseFloat(amountValue.toString());

    const { userId } = auth();

    if (!userId) {
        return { error: 'User not found' }
    }

    try {
        const transactionData: TransactionData = await db.transaction.create({
            data: {
                text,
                amount,
                userId
            }
        });
        
        revalidatePath('/');
        return { data: transactionData }
    } catch (error) {
        return { error: 'Transaction not added' }
    }

}

export default addTransaction;