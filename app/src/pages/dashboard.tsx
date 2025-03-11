import { useEffect, useState } from "react"
import axios from "axios"
import CollectionsProps from "../@interface/CollectionsProps.d"
import './dashboard.scss'
import Card from "../componants/card"
import { useNavigate } from "react-router"
const Dashboard = () => {
    const [userCollections, setUserCollections] = useState<CollectionsProps[] | null>([])
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const protocol = import.meta.env.VITE_API_PROTOCOL;
        const domain = import.meta.env.VITE_API_DOMAIN;
        const port = import.meta.env.VITE_API_PORT;

        const fetchUserCollections = async () => {
            const allUserCollections: any = await axios.get(`${protocol}://${domain}:${port}/api/collection`)
            setUserCollections(allUserCollections)
            console.log(allUserCollections);
        }
        // const fetchUsers = async () => {
        //     const allUsers: any = await axios.get(`${protocol}://${domain}:${port}/api/user`)
        //     setUsers(allUsers)
        //     console.log(users);
        // }
        fetchUserCollections()
        // fetchUsers()
    }, [])
    return (
        <div className="dashboard">
            <button onClick={() => navigate('/create-collection')}>Ajouter une collection</button>
            <h1>All collections</h1>
            {userCollections?.length && userCollections?.map((collection: CollectionsProps) => {
                return <Card>{collection}</Card>
            })}
        </div>
    )
}

export default Dashboard