
import '../styles/loader.scss'

export const Loader = () => {
    return (
        <div className="loader">
            <div className="loader__external-circle">
                <div className="loader__internal-circle">
                </div>
            </div>
        </div>
    )
}

export const Spinner = () => {
    return (
        <div className="spinner">
            <div className="spinner__circle"></div>
        </div>
    )
}