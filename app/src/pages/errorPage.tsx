
import { Link } from "react-router"

const ErrorPage = () => {
    return (
        <div className="error-page" style={{
            width: '100%', height: "100dvh", position: 'absolute', top: '4rem', left: '0'
        }}>

            <div style={{ width: '100%', height: "100%" }}>
                <h1>Error</h1>
                <Link to="/">Retour à l'accueil</Link>
            </div>
        </div>
    )
}

export default ErrorPage