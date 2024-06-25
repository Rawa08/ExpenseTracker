"use client"
import { addComas } from "@/lib/utils";
import {toast } from "react-toastify";
import deleteTransaction from "@/app/actions/deleteTransaction";

const TransactionItem = ({transaction}: {transaction: Transaction}) => {
    const sign = transaction.amount < 0 ? '-' : '+';

    const handleDeleteTransaction = async (transactionId: string) => {
        const confirmed = window.confirm('Are you shore you want to delete this transaction');

        if(!confirmed){
            return;
        }

        const {message, error } = await deleteTransaction(transactionId);

        if(error) {
            toast.error(error);
        }

        toast.success(message);

    } 
    return ( 
        <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
            {transaction.text}
            <span>{sign}{addComas(Math.abs(transaction.amount))}</span>
            <button onClick={() => handleDeleteTransaction(transaction.id)} className="delete-btn">x</button>
        </li>
     );
}
 
export default TransactionItem;

interface Transaction {
    id: string;
    text: string;
    amount: number;
    userId: string;
    createdAt: Date;
}