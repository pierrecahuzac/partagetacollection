import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router"

import '../styles/user-item.scss'

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
                console.log(response);

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
                <button type="button">Créer un item</button>
            </Link>
            <div className="user-item__list">
                {items && items?.map((item: ItemProps) => (
                    <article id={item.id}>
                        <div>{item.id}</div>
                        <section>
                            <img src={`http://192.168.1.59:3001/` + item.url} alt="" />
                        </section>
                        <section className="item__body">
                            <div className="item__name" key={item.id}>
                                {item.name}
                            </div>
                            <div className="item__description">
                                {item.description}
                            </div>
                            <div className="item__price">
                                {item.price}
                            </div>
                            <div className="item__format">
                                {item.formatType.name}
                            </div>
                        </section>
                        <section className="item__footer">
                            <div className="item__createdBy">
                                {item.user.username}
                            </div>
                            <div className="item__createdAt">
                                {item.createdAt}
                            </div>
                        </section>
                    </article>
                ))}
            </div>

        </div>
    )
}

export default UserItem