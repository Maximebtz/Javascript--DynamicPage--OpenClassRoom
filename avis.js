
// Export pour rendre disponible en dehors du fichier
export function ajoutListenersAvis() {

    const piecesElements = document.querySelectorAll(".fiches article button");
 
    for (let i = 0; i < piecesElements.length; i++) {
 
     piecesElements[i].addEventListener("click", async function (event) {
        
        // Récupération de l'attribut data-id avec dataset
        const id = event.target.dataset.id;
        // Stocker la reponse de l'API
        const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`);
        // Reconstituer les données en memoire grace à la méthode json()
        const avis = await reponse.json();
        // Ajouter au DOM
        const pieceElement = event.target.parentElement

        // Creer la balise p
        const avisElement  = document.createElement("p")

        // Remplir avec le nom de l'utilisateur
        for(let i = 0; i < avis.length; i++) {
            // += pour ajouter a la la string a la balise p "avisElement"
            avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b> ${avis[i].commentaire} <br>`;
        }
        // Ajout au parent
        pieceElement.appendChild(avisElement);
     });
 
    }
 }

 export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function (event) {
    // Bloquer l'evenement par defaut du navigateur
    event.preventDefault();
    // Création de l'objet du nouvel avis
    const avis = {
        // Event.target a la place de document pour cibler spécifiquement l'élément qui a déclenché l'événement, ce qui rend le code plus flexible, réutilisable et isolé.
        pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
        utilisateur:event.target.querySelector("[name=utilisateur]").value,
        commentaire:event.target.querySelector("[name=commentaire]").value
    }
    // Création de la charge utile en format JSON
    const chargeUtile = JSON.stringify(avis)
    // Appeler la fonction fetch avec toutes les infos nécessaires
    fetch('http://localhost:8081/avis'), {
        method: "POST",
        body: chargeUtile,
        Headers: {"Content-Type": "application/json"}
    }
    });
 }
 
 