import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"

import '../styles/user-items.scss'

const UserItem = () => {
    const navigate = useNavigate()
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
                console.log(response);
                
                setItems(response.data);
            } catch (err) {
                setItems([]);
            }
        };
        fetchMyItems()
    }, []);
    type ItemProps = {
        url: string, id: string, name: string, description: string, price: number, images: string[], user: {
            username: string
        },
        createdAt: string,
        formatType: { name: string }
    }
    return (
        <div className="user-items">
             Mes objets créés
            <Link to={"/create-item"}>
                <div className="user-items__create"><p className="user-items__create-text">Crée un objet</p></div>
            </Link>
            <div className="user-items__list">
                {items && items?.length > 0 && items?.map((item: ItemProps) => (
                    <article id={item.id} key={item.id} className="user-items__item" onClick={() => navigate(`/item/${item.id}`)} >
                        <section className="user-items__item__image-wrapper">
                            {item.images && item.images.length > 0 ? item.images
                                .filter((
                                    image: any) => image.isCover)
                                .map((
                                    image: any) => (
                                
                                    <img src={`${baseURL}` + image.url} alt="" style={{ width: "100%" }} />
                                )) : <img src='' alt="Pas d'image disponible" />}
                        </section>
                        <section className="user-items__item__content">
                            <div className="user-items__item__title" key={item.id}>
                                {item.name}
                            </div>
                            <div className="user-items__item__description">
                                {item.description}
                            </div>
                            <div className="user-items__item__price">
                                {item.price}
                            </div>
                            {/* <div className="user-items__item__format">
                                {item.formatType.name}
                            </div> */}
                        </section>
                        <section className="user-items__item__footer">
                            {/* <div className="user-items__item__createdBy">
                                {item.user.username}
                            </div> */}
                            <div className="user-items__item__createdAt">
                                {new Date(item.createdAt).toLocaleDateString("fr-FR")}

                            </div>
                        </section>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default UserItem