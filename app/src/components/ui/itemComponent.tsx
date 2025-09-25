import ItemProps from "../../@interface/ItemProps";


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
                    src={item.images && item.images.length > 0
                        ?
                        `${item.images[0].url}`
                        :
                        item.cover || "/path/to/default/image.jpg"}
                    alt={item?.formatType?.name}
                    className="homepage__item__image"
                    loading="lazy"
                    
                />
                <div className="homepage__item__date">
                    Ajouté le : {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Date inconnue'}
                </div>
            </div>
            <div className="homepage__item__content">
                <div className="homepage__item__title">{item.name}</div>
                <div className="homepage__item__details">
                    <div className="homepage__item__description">
                        {item.description}
                    </div>
                </div>

            </div>
        </article>
    )
}

export default ItemComponent;
