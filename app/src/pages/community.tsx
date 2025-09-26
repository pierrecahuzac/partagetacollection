const Community = () => {
    const searchPeople = (e: any) => {
        e.preventDefault()
        console.log(e.target);

    }
    return (
        <div className="community">
            <form action="" className="community__form" style={{ marginTop: '10rem' }}>
                <input type="text" className="community__searchBar" value={'test'} />
                <button className="community__submit" onClick={e => searchPeople(e)}>Cherche</button>
            </form>
        </div>
    )


}

export default Community;