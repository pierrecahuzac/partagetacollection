import { Link } from 'react-router'

const Landing = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 font-quicksand">
                <h1 className="text-4xl md:text-5xl font-bold text-center text-amber-600 mb-12">
                    🎉 Bienvenue sur Collectify !
                </h1>

                <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        📦 Gérez toutes vos collections en un seul endroit
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Que vous soyez passionné de cartes à collectionner, vinyles, livres, figurines ou tout autre objet de collection, Collectify vous permet de :
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-center text-gray-700">
                            <span className="text-green-500 mr-2">✅</span>
                            Créer et personnaliser vos collections selon vos besoins
                        </li>
                        <li className="flex items-center text-gray-700">
                            <span className="text-green-500 mr-2">✅</span>
                            Ajouter et modifier facilement des éléments avec des détails précis
                        </li>
                        <li className="flex items-center text-gray-700">
                            <span className="text-green-500 mr-2">✅</span>
                            Rechercher et filtrer rapidement vos objets
                        </li>
                        <li className="flex items-center text-gray-700">
                            <span className="text-green-500 mr-2">✅</span>
                            Partager vos collections avec d'autres passionnés
                        </li>
                    </ul>
                </section>

                <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        🚀 Pourquoi choisir Collectify ?
                    </h2>
                    <ul className="space-y-4">
                        <li className="flex items-start text-gray-700">
                            <span className="text-blue-500 mr-2 mt-1">🔹</span>
                            <span><strong>Interface intuitive :</strong> Une expérience fluide et agréable pour gérer vos collections sans effort</span>
                        </li>
                        <li className="flex items-start text-gray-700">
                            <span className="text-blue-500 mr-2 mt-1">🔹</span>
                            <span><strong>Accès multi-plateforme :</strong> Disponible sur desktop, mobile et tablette</span>
                        </li>
                        <li className="flex items-start text-gray-700">
                            <span className="text-blue-500 mr-2 mt-1">🔹</span>
                            <span><strong>Sécurité et confidentialité :</strong> Vos données sont protégées et accessibles uniquement par vous</span>
                        </li>
                        <li className="flex items-start text-gray-700">
                            <span className="text-blue-500 mr-2 mt-1">🔹</span>
                            <span><strong>Mode collaboratif :</strong> Gérez vos collections avec des amis ou en famille</span>
                        </li>
                    </ul>
                </section>

                <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        🔍 Fonctionnalités principales
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <li className="flex items-start p-4 bg-amber-50 rounded-lg">
                            <span className="mr-3">✨</span>
                            <span>Ajout rapide : Importez vos objets en quelques clics</span>
                        </li>
                        <li className="flex items-start p-4 bg-amber-50 rounded-lg">
                            <span className="mr-3">📸</span>
                            <span>Photos & descriptions : Ajoutez des images et des détails à chaque élément</span>
                        </li>
                        <li className="flex items-start p-4 bg-amber-50 rounded-lg">
                            <span className="mr-3">📊</span>
                            <span>Statistiques avancées : Suivez la valeur et l'évolution de votre collection</span>
                        </li>
                        <li className="flex items-start p-4 bg-amber-50 rounded-lg">
                            <span className="mr-3">📂</span>
                            <span>Catégorisation intelligente : Organisez vos objets par thèmes, années, ou tout autre critère</span>
                        </li>
                    </ul>
                </section>

                <section className="bg-white rounded-2xl shadow-lg p-8 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        🌍 Rejoignez la communauté Collectify !
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Ne laissez plus vos collections prendre la poussière ! Découvrez dès maintenant une nouvelle façon d'organiser, suivre et partager vos trésors.
                    </p>
                    <div className="flex justify-center items-center gap-2">
                        <span className="text-xl">👉</span>
                        <Link 
                            to="/signup" 
                            className="inline-block px-8 py-3 text-lg font-semibold text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                        >
                            Inscrivez-vous gratuitement
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Landing