import ItemProps from "../../@interface/ItemProps";
import NoImageAvailable from "/public/img/no_image_available.svg";


const ItemComponent = ({
    item,
    openItem,
}: {
    item: ItemProps,
    openItem: (id: string) => void,

}) => {

    return (
        <article
            key={item.id}
            onClick={() => openItem(item.id)}
            className="homepage__item"                            >
            <div className="homepage__item__image-wrapper">
                <img
                    src={item?.images[0]?.url
                        ?
                        `${item.images[0].url}`
                        :
                        NoImageAvailable
                    }
                    className="homepage__item__image"
                    loading="lazy"
                    alt={`Image de l'objet ${item?.name.toLowerCase() || 'l\'item'}`}
                />
                <div className="homepage__item__date">
                    Ajouté le : {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Date inconnue'}
                </div>
            </div>
            <div className="homepage__item__content">
                <h1 className="homepage__item__title">{item.name}</h1>
                <div className="homepage__item__details">
                    <div className="homepage__item__description">
                        {item.description}
                    </div>
                    <div className="homepage__item__creator">
                        Ajouté par : {item.creator.username && item.creator.username == "SystemDeleted" ? "Utilisateur supprimé" : item.creator.username}
                    </div>
                </div>
            </div>
        </article>
    )
}

export default ItemComponent;
