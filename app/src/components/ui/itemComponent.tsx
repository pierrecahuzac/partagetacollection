

const ItemComponent = ({
    item,
    openItem,
    baseImageUrl
}: {
    item: any,
    openItem: (id: string) => void,
    baseImageUrl: string
}) => {
    console.log(item.images);
    
    return (
        <article
            key={item.id}
            onClick={() => openItem(item.id)}
            className="homepage__item"                            >
            <div className="homepage__item__image-wrapper">
                <img
                    src={item?.images?.length > 0
                        ?
                        `${baseImageUrl}${item?.images[0].url}`
                        :
                        `${baseImageUrl}${item?.cover}`}
                    alt={item?.formatType?.name}
                    className="homepage__item__image"
                    loading="lazy"
                />
            </div>
            <div className="homepage__item__content">
                <h3 className="homepage__item__title">{item.name}</h3>
                <div className="homepage__item__details">
                    <div className="homepage__item__description">
                        {item.description}
                    </div>
                </div>
                <div className="homepage__item__date">
                    Ajouté le : {new Date(item.createdAt).toLocaleDateString()}
                </div>
            </div>
        </article>
    )
}

export default ItemComponent;
