// Import des fonctions depuis le fichier "avis.js"
import { ajoutListenersAvis, ajoutListenerEnvoyerAvis, afficherAvis, afficherGraphiqueAvis } from "./avis.js";

// Récupération des pièces éventuellement stockées dans le localStorage
let pieces = window.localStorage.getItem('pieces');

// Vérification si les pièces existent dans le localStorage
if (pieces === null) {
    // Si les pièces n'existent pas dans le localStorage, on les récupère depuis l'API
    const reponse = await fetch('http://localhost:8081/pieces/');
    pieces = await reponse.json();
    // Transformation des pièces en format JSON
    const valeurPieces = JSON.stringify(pieces);
    // Stockage des informations dans le localStorage sous le nom "pieces"
    window.localStorage.setItem("pieces", valeurPieces);
} else {
    // Si les pièces existent dans le localStorage, on les charge au format JSON
    pieces = JSON.parse(pieces);
}

// On appelle la fonction pour ajouter le listener au formulaire d'envoi d'avis
ajoutListenerEnvoyerAvis();

// Fonction pour générer les fiches de pièces dans le DOM
function genererPieces(pieces) {
    // Boucle pour parcourir toutes les pièces et créer les éléments du DOM correspondants
    for (let i = 0; i < pieces.length; i++) {
        const article = pieces[i];
        const sectionFiches = document.querySelector(".fiches"); // Récupération de l'élément du DOM où les fiches seront insérées
        const pieceElement = document.createElement("article"); // Création d'une balise <article> pour chaque pièce
        pieceElement.dataset.id = pieces[i].id; // Définition d'un attribut "data-id" pour l'élément article avec l'ID de la pièce
        const imageElement = document.createElement("img"); // Création d'une balise <img> pour afficher l'image de la pièce
        imageElement.src = article.image; // Attribution de l'URL de l'image à la balise <img>
        const nomElement = document.createElement("h2"); // Création d'une balise <h2> pour afficher le nom de la pièce
        nomElement.innerText = article.nom; // Attribution du nom de la pièce au contenu de la balise <h2>
        const prixElement = document.createElement("p"); // Création d'une balise <p> pour afficher le prix de la pièce
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`; // Attribution du prix au contenu de la balise <p>
        const categorieElement = document.createElement("p"); // Création d'une balise <p> pour afficher la catégorie de la pièce
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)"; // Attribution de la catégorie au contenu de la balise <p>
        const descriptionElement = document.createElement("p"); // Création d'une balise <p> pour afficher la description de la pièce
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment."; // Attribution de la description au contenu de la balise <p>
        const stockElement = document.createElement("p"); // Création d'une balise <p> pour afficher l'état de disponibilité de la pièce
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock"; // Attribution de l'état de disponibilité au contenu de la balise <p>
        const avisBouton = document.createElement("button"); // Création d'un bouton pour afficher les avis de la pièce
        avisBouton.dataset.id = article.id; // Attribution de l'ID de la pièce au bouton pour une utilisation future
        avisBouton.textContent = "Afficher les avis"; // Texte du bouton

        // On ajoute les éléments au DOM en les plaçant dans la sectionFiches
        sectionFiches.appendChild(pieceElement);
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
        pieceElement.appendChild(avisBouton);
    }
    // Après avoir généré toutes les fiches, on ajoute les écouteurs d'avis
    ajoutListenersAvis();
}

// On génère les fiches des pièces dans le DOM en utilisant la liste de pièces récupérée depuis le localStorage ou l'API
genererPieces(pieces);

// On vérifie si des avis existent dans le localStorage pour chaque pièce, et on les affiche s'ils existent
for (let i = 0; i < pieces.length; i++) {
    const id = pieces[i].id;
    const avisJSON = window.localStorage.getItem(`avis-piece-${id}`);
    const avis = JSON.parse(avisJSON);

    if (avis !== null) {
        const pieceElement = document.querySelector(`article[data-id="${id}"]`);
        afficherAvis(pieceElement, avis); // On affiche les avis associés à la pièce
    }
}


 //gestion des boutons 
const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
     });
     document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

//Correction Exercice
const boutonDecroissant = document.querySelector(".btn-decroissant");

boutonDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return b.prix - a.prix;
     });
     document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

const boutonNoDescription = document.querySelector(".btn-nodesc");

boutonNoDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.description
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
    if(pieces[i].prix > 35){
        noms.splice(i,1);
    }
}
console.log(noms)
//Création de l'en-tête

const pElement = document.createElement('p')
pElement.innerText = "Pièces abordables";
//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement);
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
    .appendChild(pElement)
    .appendChild(abordablesElements);

const nomsDisponibles = pieces.map(piece => piece.nom)
const prixDisponibles = pieces.map(piece => piece.prix)

for(let i = pieces.length -1 ; i >= 0; i--){
    if(pieces[i].disponibilite === false){
        nomsDisponibles.splice(i,1);
        prixDisponibles.splice(i,1);
    }
}

const disponiblesElement = document.createElement('ul');

for(let i=0 ; i < nomsDisponibles.length ; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`
    disponiblesElement.appendChild(nomElement);
}

const pElementDisponible = document.createElement('p')
pElementDisponible.innerText = "Pièces disponibles:";
document.querySelector('.disponibles').appendChild(pElementDisponible).appendChild(disponiblesElement)

const inputPrixMax = document.querySelector('#prix-max')
inputPrixMax.addEventListener('input', function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= inputPrixMax.value;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);  
})

// Ajout du listener pour mettre à jour des données du localStorage
const boutonMettreAJour = document.querySelector(".btn-maj");
boutonMettreAJour.addEventListener("click", function () {
   window.localStorage.removeItem("pieces");
});

await afficherGraphiqueAvis()