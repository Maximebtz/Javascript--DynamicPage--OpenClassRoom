
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
 