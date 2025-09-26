import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/authContext";
// import Button from "../components/ui/button";

import ItemProps from "../@interface/ItemProps";

import ItemComponent from "../components/ui/itemComponent";

import '../styles/homepage.scss'
import '../styles/button.scss'

const Homepage = () => {
    const baseURL = import.meta.env.VITE_BASE_URL;

    const [items, setItems] = useState<ItemProps[] | []>([])
    const [_isLoading, setIsLoading] = useState<boolean>(false)
    const [_error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const { isConnected, logout } = useAuth();

    const fetchItems = async (): Promise<void> => {
        try {
            const response = await axios.get<ItemProps[]>(`${baseURL}/item`, {
                withCredentials: true,
            });
            setItems(response.data);
            setIsLoading(false)
        } catch (err: any) {
            if (err.response?.status === 401) {
                try {
                    await logout();
                } catch (err) {
                    console.log(err);
                    setIsLoading(false)
                } finally {
                    navigate('/signin');
                    setIsLoading(false)
                }
                return;
            }
            setError(err);
            setItems([]);
        }
    };

    useEffect(() => {
        if (!isConnected) {
            navigate('/')
        }
        setIsLoading(true);
        setError(null);
        Promise.all([
            fetchItems()])

    }, [isConnected]);

    const openItem = (itemId: string) => {
        navigate(`/item/${itemId}`);
    };

    return (
        <div className="homepage">
            <div className="homepage__container">
                <h2 className="homepage__section-title">Les derniers objets ajoutés par la communauté</h2>
                <div className="homepage__button"><Link to={"/create-item"} >
                    <button type="button" className="button">
                        Ajouter un nouvel objet
                    </button>
                </Link></div>
                

                <div className="homepage__items-list">
                    {Array.isArray(items as ItemProps[]) &&
                        items.length > 0 &&

                        items.map((item: ItemProps) => (
                            <ItemComponent key={item.id} item={item} openItem={openItem} />
                        ))}
                </div>
            </div>
        </div>
    );

}

export default Homepage