import Guest from "@/components/Guest";
import AddTransaction from "@/components/AddTransaction";
import { currentUser } from "@clerk/nextjs/server";
const HomePage = async () => {
  const user = await currentUser();

  if(!user) {
    return <Guest />
  }
  return (<main>
    <h1>Welcome, {user.firstName}</h1>
    <AddTransaction />
  </main>);
}
 
export default HomePage;