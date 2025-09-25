import axios from "axios"

import { useEffect, useState } from "react"
import { TbHeartFilled } from "react-icons/tb";
import ItemProps from "../@interface/ItemProps";

import '../styles/userFavorites.scss'
import { useNavigate } from "react-router-dom";
const UserFavorites = () => {
    const [favorites, setFavorites] = useState<ItemProps[]>([])
    const baseURL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate()

    useEffect(() => {
        Promise.all([
            fetchFavorites()])
    }, [])

    const fetchFavorites = async () => {
        try {
            const response = await axios.get(`${baseURL}/like-item/getAllUserFavoritesItems`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })


            setFavorites(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    const deleteFromFavorites = async (itemId: string) => {
        try {
            const response = await axios.delete(`${baseURL}/like-item/deleteItemFromFavorites/${itemId}`, {
                withCredentials: true,
            })
            console.log(response);
            if (response.status === 200) fetchFavorites()

        } catch (error) {
            console.log(error);

        }
    }

    const openItem = (itemId: string) => {
        navigate(`/item/${itemId}`);
    };

    return (
        <div className="user-favorites">
            <div className="user-favorites__list" >
                {favorites.length > 0 && favorites.map((favorite) =>
       
                    <div className="user-favorites__item" key={favorite.item.id}>
                        <div className="user-favorites__image-container">
                        
                            <img  onClick={() => openItem(favorite.item.id)} src={favorite.item.images.length > 0 ? favorite.item.images[0].url : '/default-cover.jpg'} alt="" className="user-favorites__image" />
                        </div>
                        
                        <div className="user-favorites__name">{favorite.item.name}</div>
                        <div className="user-favorites__description">{favorite.item.description}</div>
                        <div className="user-favorites__name">{favorite.item.artist}</div>
                        <div className="user-favorites__name">{favorite.item.album}</div>
                        <div className="user-favorites__footer">
                            <div className="user-favorites__footer__fav" onClick={() => deleteFromFavorites(favorite.item.id)}><TbHeartFilled /></div></div>

                    </div>
                )}
            </div>


        </div>
    )
}

export default UserFavorites