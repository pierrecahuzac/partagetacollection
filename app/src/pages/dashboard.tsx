import { useEffect, useState } from "react"
import axios from "axios"
const Dashboard = () => {
    const [deals, setDeals] = useState([])
    useEffect(() => {
        const protocol = import.meta.env.VITE_API_PROTOCOL;
        const domain = import.meta.env.VITE_API_DOMAIN;
        const port = import.meta.env.VITE_API_PORT;
        
        const fetchUsers = async () => {
            const allDeals : any = await axios.get(`${protocol}://${domain}:${port}/api/deal`)
            setDeals(allDeals)
            console.log(deals);

        }
        fetchUsers()
    }, [])
    return (
        <div className="dashboard">Dashboard</div>
    )
}

export default Dashboard