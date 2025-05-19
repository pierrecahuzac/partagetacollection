import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router"

import '../styles/user-item.scss'
import { imgSource } from "../utils/imgSource";

const UserItem = () => {
    const [items, setItems] = useState<any>()
    const baseURL = import.meta.env.VITE_BASE_URL;
    // const baseImageUrl = import.meta.env.VITE_BASE_IMAGE_URL;
    // const navigate = useNavigate()
    useEffect(() => {
        const fetchMyItems = async () => {
            try {
                const response = await axios.get(
                    `${baseURL}/api/item/user-items`,
                    {
                        withCredentials: true,
                    }
                );

                setItems(response.data);
            } catch (err) {
                setItems([]);
            }
        };
        fetchMyItems()
    }, []);
    type ItemProps = {
        url: string, id: string, name: string, description: string, price: number, user: {
            username: string
        },
        createdAt: string,
        formatType: { name: string }
    }
    return (
        <div className="user-item">
            <Link to={"/create-item"}>
                <div className="user-item__create"><p className="user-item__create-text">Ajouter un item</p></div>
            </Link>
            <div className="user-item__list">
                {items && items?.length > 0 && items?.map((item: ItemProps) => (console.log(item.url),
                    <article id={item.id} className="user-item__item">
                        <section className="user-item__item__image-wrapper">
                            {item.url !== undefined ? 
                            <img src={`${baseURL}` + item.url} alt="" /> : 
                            <img src='' alt="Pas d'image disponible" />}
                        </section>
                        <section className="user-item__item__content">
                            <div className="user-item__item__title" key={item.id}>
                                {item.name}
                            </div>
                            <div className="user-item__item__description">
                                {item.description}
                            </div>
                            <div className="user-item__item__price">
                                {item.price}
                            </div>
                            <div className="user-item__item__format">
                                {item.formatType.name}
                            </div>
                        </section>
                        <section className="user-item__item__footer">
                            <div className="user-item__item__createdBy">
                                {item.user.username}
                            </div>
                            <div className="user-item__item__createdAt">
                           { new Date(item.createdAt).toLocaleDateString("fr-FR")}
                                
                            </div>
                        </section>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default UserItem