
// Export pour rendre disponible en dehors du fichier
export function ajoutListenersAvis() {

    const piecesElements = document.querySelectorAll(".fiches article button");
 
    for (let i = 0; i < piecesElements.length; i++) {
 
     piecesElements[i].addEventListener("click", function (event) {
        
        // Récupération de l'attribut data-id avec dataset
        const id = event.target.dataset.id;
        fetch(`http://localhost:8081/pieces/${id}/avis`);
 
     });
 
    }
 }
 