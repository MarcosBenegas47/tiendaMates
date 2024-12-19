import { baseClient } from "@/lib/firebase/baseClient";
import DashboardClient from "./page.client";


const Dashboard = async () => {
    const client = await baseClient()
    return (
        <DashboardClient data={client}/>
    );
}

  
export default Dashboard;