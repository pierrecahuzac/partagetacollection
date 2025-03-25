import { Link } from 'react-router';
//import './styles.css'; // Assurez-vous d'importer le fichier CSS
import '../styles/landing.scss'
const Landing = () => {
    return (
        <div className="landing-container">
            <div className="content-wrapper">
                <h1>
                    🎉 Bienvenue sur Collectify !
                </h1>

                <section className="section">
                    <h2>
                        📦 Gérez toutes vos collections en un seul endroit
                    </h2>
                    <p>
                        Que vous soyez passionné de cartes à collectionner, vinyles, livres, figurines ou tout autre objet de collection, Collectify vous permet de :
                    </p>
                    <ul>
                        <li className="list">
                            <span className="list-icon">✅</span>
                            Créer et personnaliser vos collections selon vos besoins
                        </li>
                        <li className="list">
                            <span className="list-icon">✅</span>
                            Ajouter et modifier facilement des éléments avec des détails précis
                        </li>
                        <li className="list">
                            <span className="list-icon">✅</span>
                            Rechercher et filtrer rapidement vos objets
                        </li>
                        <li className="list">
                            <span className="list-icon">✅</span>
                            Partager vos collections avec d'autres passionnés
                        </li>
                    </ul>
                </section>

                <section className="section">
                    <h2>
                        🚀 Pourquoi choisir Collectify ?
                    </h2>
                    <ul>
                        <li className="list">
                            <span className="list-icon-blue">🔹</span>
                            <span><strong>Interface intuitive :</strong> Une expérience fluide et agréable pour gérer vos collections sans effort</span>
                        </li>
                        <li className="list">
                            <span className="list-icon-blue">🔹</span>
                            <span><strong>Accès multi-plateforme :</strong> Disponible sur desktop, mobile et tablette</span>
                        </li>
                        <li className="list">
                            <span className="list-icon-blue">🔹</span>
                            <span><strong>Sécurité et confidentialité :</strong> Vos données sont protégées et accessibles uniquement par vous</span>
                        </li>
                        <li className="list">
                            <span className="list-icon-blue">🔹</span>
                            <span><strong>Mode collaboratif :</strong> Gérez vos collections avec des amis ou en famille</span>
                        </li>
                    </ul>
                </section>

                <section className="section">
                    <h2>
                        🔍 Fonctionnalités principales
                    </h2>
                    <ul className="grid-list">
                        <li className="grid-item">
                            <span>✨</span>
                            <span>Ajout rapide : Importez vos objets en quelques clics</span>
                        </li>
                        <li className="grid-item">
                            <span>📸</span>
                            <span>Photos & descriptions : Ajoutez des images et des détails à chaque élément</span>
                        </li>
                        <li className="grid-item">
                            <span>📊</span>
                            <span>Statistiques avancées : Suivez la valeur et l'évolution de votre collection</span>
                        </li>
                        <li className="grid-item">
                            <span>📂</span>
                            <span>Catégorisation intelligente : Organisez vos objets par thèmes, années, ou tout autre critère</span>
                        </li>
                    </ul>
                </section>

                <section className="section cta-section">
                    <h2>
                        🌍 Rejoignez la communauté Collectify !
                    </h2>
                    <p>
                        Ne laissez plus vos collections prendre la poussière ! Découvrez dès maintenant une nouvelle façon d'organiser, suivre et partager vos trésors.
                    </p>
                    <div className="cta-buttons">
                        <span>👉</span>
                        <Link
                            to="/signup"
                            className="cta-button"
                        >
                            Inscrivez-vous gratuitement
                        </Link>
                        <Link
                            to="/homepage"
                            className="cta-button"
                        >
                            Visitez gratuitement
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Landing;
