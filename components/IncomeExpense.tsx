import getIncomeExpense
 from "@/app/actions/getIncomeExpense";
 import { addComas } from "@/lib/utils";
const IncomeExpense = async () => {
const { income, expense } = await getIncomeExpense();

const fromatedIncome = addComas(Number(income?.toFixed(2)));
const fromatedExpense = addComas(Number(expense?.toFixed(2)));
    return (
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p className="money plus">{fromatedIncome}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p className="money minus">{fromatedExpense}</p>
            </div>
        </div>
    );
}
 
export default IncomeExpense;