import { baseClient, baseClientTurso } from "@/lib/firebase/baseClient";
import DashboardClient from "./page.client";


const Dashboard = async () => {
    const client = await baseClient()
    const clientT = await baseClientTurso()
    console.log(clientT)
    return (
        <DashboardClient data={clientT}/>
    );
}

  
export default Dashboard;