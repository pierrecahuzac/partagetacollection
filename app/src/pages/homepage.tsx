import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/authContext";

import { ItemProps } from "../@interface/ItemProps";

import ItemComponent from "../components/ui/itemComponent";

import '../styles/homepage.scss'


const Homepage = () => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;

    const [items, setItems] = useState<ItemProps[] | []>([])
    const [_isLoading, setIsLoading] = useState<boolean>(false)
    const [_error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const { isConnected } = useAuth();

    const fetchItems = async () => {
        try {
            const response = await axios.get<ItemProps[]>(`${baseURL}/item`, {
                withCredentials: true,
            });
            setItems(response.data);
        } catch (err: any) {
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
            .finally(() => setIsLoading(false));
    }, [isConnected]);

    const openItem = (itemId: string) => {
        navigate(`/item/${itemId}`);
    };

    return (
        <div className="homepage">
            <div className="homepage__container">
                <h2 className="homepage__section-title">Les derniers objets ajoutés par la communauté</h2>
                <Link to={"/create-item"}>
                <button type="button">+</button>
                </Link>


                <div className="homepage__items-list">
                    {Array.isArray(items) &&
                        items.length > 0 &&
                        items.map((item: { id: string }) => (
                            <ItemComponent key={item.id} item={item} openItem={openItem} baseImageUrl={baseImageUrl} />
                        ))}
                </div>
            </div>
        </div>
    );

}

export default Homepage