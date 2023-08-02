// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

// Création des éléments pour l'exo
const article = pieces[0]; // Move this line here

const descriptionElement = document.createElement("p");
descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";

const stockElement = document.createElement("p");
stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";

// Rattachement des balises au DOM
// const imageElement = document.createElement("img");
// imageElement.src = article.image;


// const sectionFiches = document.querySelector(".fiches");
// sectionFiches.appendChild(imageElement);


// sectionFiches.appendChild(descriptionElement); 
// sectionFiches.appendChild(stockElement);

for (let i = 0; i < pieces.length; i++) {

    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");
    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");
    // On crée l’élément img.
    const imageElement = document.createElement("img");
    // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
        imageElement.src = pieces[i].image;
    // Idem pour le nom, le prix et la catégorie...
    const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
    const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} €`;
    const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie;
    
    // On rattache la balise article à la section Fiches
    sectionFiches.appendChild(pieceElement);
    // On rattache l’image à pieceElement (la balise article)
    pieceElement.appendChild(imageElement);
    // Idem pour le nom, le prix et la catégorie..
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    }

    const noDeBtn = document.querySelector(".btn-decroissant")

    noDeBtn.addEventListener("click", function() {
        
    })