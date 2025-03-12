import { Link } from 'react-router'
const Landing = () => {
    return (

        <div className="font-quicksand w-10/12 m-auto flex flex-col justify-center align-middle">
            <h1 className='text-3xl mb-10 tex-'>🎉 Bienvenue sur Collectify !</h1>
            <section className="mb-10">
                <ul>📦 Gérez toutes vos collections en un seul endroit
                    Que vous soyez passionné de cartes à collectionner, vinyles, livres, figurines ou tout autre objet de collection, Collectify vous permet de :
                    <li>✅ Créer et personnaliser vos collections selon vos besoins</li>
                    <li>✅ Ajouter et modifier facilement des éléments avec des détails précis</li>
                    <li>✅ Rechercher et filtrer rapidement vos objets</li>
                    <li>✅ Partager vos collections avec d'autres passionnés</li>

                </ul>



            </section>

            <section className="mb-10">
                <h2>🚀 Pourquoi choisir Collectify ?</h2>
                <ul>
                    <li>🔹 Interface intuitive : Une expérience fluide et agréable pour gérer vos collections sans effort</li>
                    <li>🔹 Accès multi-plateforme : Disponible sur desktop, mobile et tablette</li>
                    <li>🔹 Sécurité et confidentialité : Vos données sont protégées et accessibles uniquement par vous</li>
                    <li>🔹 Mode collaboratif : Gérez vos collections avec des amis ou en famille</li>
                </ul>
            </section>

            <section className="mb-10"><h2>🔍 Fonctionnalités principales</h2>
                <ul>
                    <li>✨ Ajout rapide : Importez vos objets en quelques clics</li>
                    <li>📸 Photos & descriptions : Ajoutez des images et des détails à chaque élément</li>
                    <li>📊 Statistiques avancées : Suivez la valeur et l’évolution de votre collection</li>
                    <li>  📂 Catégorisation intelligente : Organisez vos objets par thèmes, années, ou toute autre critère</li>
                </ul>



            </section>

            <section className="mb-10">
                <h2>🌍 Rejoignez la communauté Collectify !</h2>
                <p>Ne laissez plus vos collections prendre la poussière ! Découvrez dès maintenant une nouvelle façon d’organiser, suivre et partager vos trésors.</p>


                👉 <Link to={"/signup"} className='bg-amber-200'>Inscrivez-vous</Link>  gratuitement et commencez dès aujourd’hui !</section> </div>
    )
}

export default Landing