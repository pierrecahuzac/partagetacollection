import './card.scss'
const card = ({ children }: any) => {
    return (
        <div className="card">
            <img className="card_img  " src="" alt="" />
            <div className="card_type  "  >type</div>
            <div className="card_name  "  >name</div>
            {children}
        </div >
    )
}

export default card