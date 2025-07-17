
import { Link } from "react-router"

const ErrorPage = () => {
    return (
        <div className="error-page" style={{
            width: '100vw', height: "100vh", position: 'absolute', top: '4rem', left: '0'
        }}>

            <div style={{ width: '100vw', height: "100vh" }}>
                <h1>Error</h1>
                <Link to="/">Retour à l'accueil</Link>
            </div>
        </div>
    )
}

export default ErrorPage