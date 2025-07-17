const CollectionComponent = (
    { collection, openCollection, baseImageUrl }:
        {
            collection: any,
            openCollection: (id: string) => void,
            baseImageUrl: string
        }) => {
    
    return (
        <article
            key={collection.id}
            onClick={() => openCollection(collection.id)}
            className="homepage__collection"
        >
            <div className="homepage__collection__image-wrapper">
                {collection.images && collection.images.length > 0 ? (
                    collection.images
                        .filter((img: { isCover: boolean }) => img.isCover)
                        .map((img: any) =>
                            img.url ? (

                                <img
                                    key={img.id}
                                    src={`${baseImageUrl}${img.url}`}
                                    alt="cover"
                                    className="homepage__collection__image"
                                />
                            ) : null
                        )
                ) : (
                    <img
                        src="/default-cover.jpg"
                        alt="Image de couverture par défaut"
                        className="homepage__collection__image"
                    />
                )}
            </div>
            <div className="homepage__collection__content">
                <h3 className="homepage__collection__title">{collection.title}</h3>

                <div className="homepage__collection__tags">
                    {collection?.tags?.map((tag: string, index: number) => (
                        <span key={index} className="homepage__collection__tag">
                            {tag}
                        </span>
                    ))}
                </div>

                <p className="homepage__collection__description">
                    {collection.description}
                </p>

                <div className="homepage__collection__footer">
                    <div className="homepage__collection__visibility">
                        <span className="homepage__collection__visibility-text">
                            {collection.isPublic ? "Publique" : "Privée"}
                        </span>
                        <div
                            className={
                                collection.isPublic
                                    ? "homepage__collection--public"
                                    : "homepage__collection--private"
                            }
                        />
                    </div>
                    <span className="homepage__collection__date">
                        {new Date(collection.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </article>)
}

export default CollectionComponent;