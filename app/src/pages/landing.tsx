import { Link } from 'react-router';
import '../styles/landing.scss';

const Landing = () => {
    return (
        <div className="landing-page">
            <div className="content-wrapper">
                <h1>🎉 Bienvenue sur Collectify !</h1>

                <section className="section section__first">
                    <div className="section__overlay"></div>
                    <div className="section__container">
                        <h2>📦 Gérez toutes vos collections en un seul endroit</h2>
                        <p>
                            Que vous soyez passionné de cartes à collectionner, vinyles, livres, figurines ou tout autre objet de collection,
                            Collectify vous permet de :
                        </p>
                        <ul>
                            <li className="list"><span className="list-icon">✅</span>Créer et personnaliser vos collections</li>
                            <li className="list"><span className="list-icon">✅</span>Ajouter et modifier facilement des éléments</li>
                            <li className="list"><span className="list-icon">✅</span>Rechercher et filtrer rapidement vos objets</li>
                            <li className="list"><span className="list-icon">✅</span>Partager vos collections avec d'autres passionnés</li>
                        </ul>
                    </div>
                </section>

                <section className="section section__second">
                    <div className="section__overlay"></div>
                    <div className="section__container">
                        <h2>🚀 Pourquoi choisir Collectify ?</h2>
                        <ul>
                            <li className="list"><span className="list-icon-blue">🔹</span><strong>Interface intuitive :</strong> Expérience fluide</li>
                            <li className="list"><span className="list-icon-blue">🔹</span><strong>Accès multi-plateforme :</strong> Desktop, mobile, tablette</li>
                            <li className="list"><span className="list-icon-blue">🔹</span><strong>Sécurité et confidentialité :</strong> Données protégées</li>
                            <li className="list"><span className="list-icon-blue">🔹</span><strong>Mode collaboratif :</strong> Gérez avec vos amis</li>
                        </ul>
                    </div>
                </section>

                <section className="section cta-section">
                    <div className="section__overlay"></div>
                    <div className="section__container">
                        <h2>🌍 Rejoignez la communauté Collectify !</h2>
                        <p>Ne laissez plus vos collections prendre la poussière !</p>
                        <div className="cta-buttons">
                            <Link to="/signup" className="cta-button">Inscrivez-vous gratuitement</Link>
                            {/* <Link to="/homepage" className="cta-button">Visitez gratuitement</Link> */}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}; 
export default Landing 