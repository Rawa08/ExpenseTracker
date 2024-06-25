import getUserBalance from "@/app/actions/getUserBalance";
import {addComas} from "@/lib/utils";

const Balance = async () => {
    const {balance} = await getUserBalance();
    return (
        <>
        <h4>Your balance</h4>
        <h1>{addComas(Number(balance?.toFixed(2)) || 0) }</h1>
        </>
    );
}
 
export default Balance;